/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import {
  authCredentialPath,
  authSessionPath,
} from "../../../../service_endpoints/services";
import { BadRequest } from "@feathersjs/errors";
import { AuthSession } from "../../../../db_services/v1/auth-session/auth-session.class";
import {
  AuthSession_FIND,
  AuthSession_GET,
  AuthSession_QUERY,
  AuthSessionStatusType,
} from "../../../../db_services/v1/auth-session/intefaces/AuthSessionInterface";
import { AuthCredential } from "../../../../db_services/v1/auth-credential/auth-credential.class";

const RefreshTokenHook =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app, data, params } = context;
    const authSessionService = app.service(authSessionPath) as AuthSession &
      ServiceAddons<any>;
    const authCredentialService = app.service(
      authCredentialPath
    ) as AuthCredential & ServiceAddons<any>;

    if (!params.headers || !params.headers.authorization) {
      throw new BadRequest(
        "Invalid attempt, Access token is required in headers."
      );
    }
    const query: AuthSession_QUERY = {
      accessToken: params.headers.authorization,
      status: AuthSessionStatusType.ACTIVE,
      endedOn: null,
    };
    const sessionData: AuthSession_GET | null = await authSessionService
      .find({ query })
      .then((res: AuthSession_FIND | any) =>
        res.total > 0 ? res.data[0] : null
      );

    if (sessionData) {
      await authSessionService
        .patch(sessionData.id, {
          endedOn: new Date().toString(),
          status: AuthSessionStatusType.DELETED,
        })
        .then((res: AuthSession_FIND | any) =>
          res.total > 0 ? res.data : null
        )
        .catch((err) => {
          throw new BadRequest(err);
        });
      data.credentialData = await authCredentialService
        .get(sessionData.credentialId)
        .catch((err) => {
          throw new BadRequest(err);
        });
    } else {
      throw new BadRequest("Invalid access token");
    }
    context.data = data;
    return context;
  };

export default RefreshTokenHook;
