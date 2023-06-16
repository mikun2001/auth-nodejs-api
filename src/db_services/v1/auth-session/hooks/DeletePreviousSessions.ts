/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 02-03-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import {
  AuthSession_FIND,
  AuthSession_GET,
  AuthSession_QUERY,
  AuthSessionStatusType,
} from "../intefaces/AuthSessionInterface";
import { LoginPostDataInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import { authSessionPath } from "../../../../service_endpoints/services";
import { AuthSession } from "../auth-session.class";

const DeletePreviousSessions =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app } = context;
    const data = context.data as LoginPostDataInterface;

    const authSessionService = app.service(authSessionPath) as AuthSession &
      ServiceAddons<any>;

    const query: AuthSession_QUERY = {
      credentialId: data.credentialData.id,
      endedOn: null,
    };
    if (data.deviceId) {
      query.deviceId = data.deviceId;
    }

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
    context.data = data;
    return context;
  };

export default DeletePreviousSessions;
