/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import {
  AuthSession_GET,
  AuthSession_POST,
  AuthSessionStatusType,
} from "../db_services/v1/auth-session/intefaces/AuthSessionInterface";
import { CreateSessionInterface } from "../utils/AuthHelper/AuthHelperInterface";
import { AuthSession } from "../db_services/v1/auth-session/auth-session.class";
import { authSessionPath } from "../service_endpoints/services";
import { AuthHelper } from "../utils/AuthHelper/AuthHelper";

const CreateSessionHook =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app } = context;
    const data = context.data as CreateSessionInterface;
    const sessionService = app.service(authSessionPath) as AuthSession &
      ServiceAddons<any>;

    const newSessionData: AuthSession_POST = {
      credentialData: data.credentialData,
      ip: data.ip,
      credentialId: data.credentialData.id,
      deviceId: data.deviceId,
      fcmId: data.fcmId,
      deviceType: data.deviceType,
      status: AuthSessionStatusType.ACTIVE,
    };

    const sessionData: AuthSession_GET = await sessionService
      .create(newSessionData, {
        query: {},
        provider: undefined,
      })
      .catch((e: any) => {
        throw e;
      });
    context.result = {
      ...context.result,
      accessToken: sessionData.accessToken,
      credential: AuthHelper.restrictCredentialDataFromResponse(
        data.credentialData
      ),
    };
    return context;
  };

export default CreateSessionHook;
