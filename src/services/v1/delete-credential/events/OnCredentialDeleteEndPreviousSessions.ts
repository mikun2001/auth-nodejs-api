/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 02-03-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import {
  AuthSession_FIND,
  AuthSession_GET,
  AuthSessionStatusType,
} from "../../../../db_services/v1/auth-session/intefaces/AuthSessionInterface";
import { LoginPostDataInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import { authSessionPath } from "../../../../service_endpoints/services";
import { AuthSession } from "../../../../db_services/v1/auth-session/auth-session.class";
import {
  AuthCredential_GET,
  AuthCredentialStatusType,
} from "../../../../db_services/v1/auth-credential/intefaces/AuthCredentialInterface";

const OnCredentialDeleteEndPreviousSessions = async (
  result: AuthCredential_GET,
  context: HookContext
) => {
  const { app } = context;
  const data = context.data as LoginPostDataInterface;
  if (result.status === AuthCredentialStatusType.DELETED) {
    const authSessionService = app.service(authSessionPath) as AuthSession &
      ServiceAddons<any>;

    const query = {
      credentialId: result.id,
      endedOn: null,
    };

    const prevSessionData: Array<AuthSession_GET> | null =
      await authSessionService
        .find({ query })
        .then((res: AuthSession_FIND | any) =>
          res.total > 0 ? res.data : null
        )
        .catch((err) => {
          throw new BadRequest(err);
        });
    if (prevSessionData) {
      prevSessionData.map(async (each) => {
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
    }
  }
};

export default OnCredentialDeleteEndPreviousSessions;
