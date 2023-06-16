/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 06-03-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import {
  AuthConfig_FIND,
  AuthConfig_GET,
  AuthConfig_POST,
  AuthConfigStatusType,
} from "../intefaces/AuthConfigInterfaces";
import {
  authConfigPath,
  authEntityPath,
} from "../../../../service_endpoints/services";
import { AuthConfig } from "../auth-config.class";
import { BadRequest } from "@feathersjs/errors";
import { AuthEntity } from "../../auth-entity/auth-entity.class";
import {
  AuthEntity_FIND,
  AuthEntity_GET,
  AuthEntityStatusType,
} from "../../auth-entity/intefaces/AuthEntityInterface";

const ValidateAuthConfigData =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app, params } = context;
    const data = context.data as AuthConfig_POST;
    let query = {};
    const authConfigService = app.service(authConfigPath) as AuthConfig &
      ServiceAddons<any>;
    const authEntityService = app.service(authEntityPath) as AuthEntity &
      ServiceAddons<any>;
    query = {
      metaName: data.entity,
      status: AuthEntityStatusType.ACTIVE,
    };
    const entityData: AuthEntity_GET | null = await authEntityService
      .find({
        query,
      })
      .then((res: AuthEntity_FIND | any) =>
        res.total > 0 ? res.data[0] : null
      );

    if (entityData) {
      data.entityId = entityData.id;
    } else {
      throw new BadRequest("No entity exists on this entity name.");
    }
    const configData: AuthConfig_GET | null = await authConfigService
      ._find({
        query: {
          entityId: data.entityId,
          status: AuthConfigStatusType.ACTIVE,
        },
      })
      .then((res: AuthConfig_FIND) =>
        res.total > 0 && res.data ? res.data[0] : null
      );
    if (configData) {
      throw new BadRequest("Already auth config exists for this entity.");
    }
    context.data = data;
    return context;
  };

export default ValidateAuthConfigData;
