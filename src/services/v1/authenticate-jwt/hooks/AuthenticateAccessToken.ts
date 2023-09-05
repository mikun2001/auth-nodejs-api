/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import {
  authCredentialPath,
  authSessionPath,
} from "../../../../service_endpoints/services";
import { AuthSession } from "../../../../db_services/v1/auth-session/auth-session.class";
import { AuthCredential } from "../../../../db_services/v1/auth-credential/auth-credential.class";
import {
  AuthSession_FIND,
  AuthSession_GET,
  AuthSession_QUERY,
  AuthSessionStatusType,
} from "../../../../db_services/v1/auth-session/intefaces/AuthSessionInterface";
import {
  AuthCredential_GET,
  AuthCredentialStatusType,
} from "../../../../db_services/v1/auth-credential/intefaces/AuthCredentialInterface";
import { BadRequest } from "@feathersjs/errors";

const AuthenticateAccessToken =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app, params } = context;
    let flag = false;
    const sessionService = app.service(authSessionPath) as AuthSession &
      ServiceAddons<any>;
    const credentialService = app.service(
      authCredentialPath
    ) as AuthCredential & ServiceAddons<any>;

    if (!params.headers || !params.headers.authorization) {
      throw new BadRequest(
        "Invalid login attempt, Access token is required in headers."
      );
    }

    const query: AuthSession_QUERY = {
      accessToken: params.headers.authorization.replace("Bearer ", ""),
      status: AuthSessionStatusType.ACTIVE,
      endedOn: null,
    };

    const sessionData: AuthSession_GET | null = await sessionService
      .find({ query })
      .then((res: AuthSession_FIND | any) =>
        res.total > 0 ? res.data[0] : null
      );

    if (sessionData) {
      const credentialData: AuthCredential_GET | null = await credentialService
        .get(sessionData.credentialId, {
          status: AuthCredentialStatusType.ACTIVE,
        })
        .catch((err) => {
          throw new BadRequest(err);
        });
      if (credentialData) {
        flag = true;
        context.result = {
          authenticated: true,
          credential: credentialData,
          // credential: AuthHelper.restrictCredentialDataFromResponse(credentialData),
        };
      }
    }
    if (!flag) {
      context.result = {
        authenticated: false,
        message: "Invalid Access token, Not Authenticated.",
        credential: null,
      };
    }
    return context;
  };

export default AuthenticateAccessToken;
