/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 02-03-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import { authConfigPath } from "../../../../service_endpoints/services";
import {
  AuthEntity_GET,
  AuthEntityStatusType,
} from "../intefaces/AuthEntityInterface";
import { AuthConfig } from "../../auth-config/auth-config.class";
import {
  AuthConfig_FIND,
  AuthConfig_GET,
  AuthConfigStatusType,
} from "../../auth-config/intefaces/AuthConfigInterfaces";

const OnEntityDeleteCredentials = async (
  result: AuthEntity_GET,
  context: HookContext
) => {
  const { app } = context;
  if (result.status === AuthEntityStatusType.DELETED) {
    const authConfigService = app.service(authConfigPath) as AuthConfig &
      ServiceAddons<any>;

    const query = {
      entityId: result.id,
      status: AuthConfigStatusType.ACTIVE,
    };

    const configData: AuthConfig_GET | null = await authConfigService
      ._find({
        query,
      })
      .then((res: AuthConfig_FIND) =>
        res.total > 0 && res.data ? res.data[0] : null
      );
    if (configData) {
      await authConfigService
        .patch(configData.id, { status: AuthConfigStatusType.DELETED })
        .catch((err) => {
          // console.log(err);
        });
    }
  }
};

export default OnEntityDeleteCredentials;
