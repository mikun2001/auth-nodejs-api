/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import { authSessionPath } from "../../../../service_endpoints/services";
import { BadRequest } from "@feathersjs/errors";
import { AuthSession } from "../../../../db_services/v1/auth-session/auth-session.class";
import {
  AuthSession_FIND,
  AuthSession_GET,
  AuthSession_QUERY,
  AuthSessionStatusType,
} from "../../../../db_services/v1/auth-session/intefaces/AuthSessionInterface";

const ChangeSessionDataForLogout =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app, data, params } = context;
    const authSessionService = app.service(authSessionPath) as AuthSession &
      ServiceAddons<any>;

    if (!params.headers || !params.headers.authorization) {
      throw new BadRequest(
        "Invalid logout attempt, Access token is required in headers."
      );
    }
    let query: AuthSession_QUERY = {
      accessToken: params.headers.authorization,
      status: AuthSessionStatusType.ACTIVE,
      endedOn: null,
    };
    const session: AuthSession_GET | null = await authSessionService
      .find({ query })
      .then((res: AuthSession_FIND | any) =>
        res.total > 0 ? res.data[0] : null
      );

    if (data.logoutAllDevice && session) {
      query = {
        credentialId: session.credentialId,
        status: AuthSessionStatusType.ACTIVE,
        endedOn: null,
      };
    }

    const sessionData: Array<AuthSession_GET> | null = await authSessionService
      .find({ query })
      .then((res: AuthSession_FIND | any) => (res.total > 0 ? res.data : null));
    if (sessionData) {
      const patchedSessionData = sessionData.map(async (each) => {
        await authSessionService
          .patch(each.id, {
            endedOn: new Date().toString(),
            status: AuthSessionStatusType.DELETED,
          })
          .then((res: AuthSession_FIND | any) =>
            res.total > 0 ? res.data : null
          )
          .catch((err) => {
            throw new BadRequest(err);
          });
      });
      if (patchedSessionData) {
        context.result = {
          message: "Logout successful.",
        };
      }
    } else {
      throw new BadRequest("Invalid access token");
    }
    return context;
  };

export default ChangeSessionDataForLogout;
