/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import { authEntityPath } from "../service_endpoints/services";
import { AuthEntity } from "../db_services/v1/auth-entity/auth-entity.class";
import {
  AuthEntity_FIND,
  AuthEntity_GET,
  AuthEntityStatusType,
} from "../db_services/v1/auth-entity/intefaces/AuthEntityInterface";
import { BadRequest } from "@feathersjs/errors";
import { LoginPostDataInterface } from "../utils/AuthHelper/AuthHelperInterface";

const ValidateEntityDataHook =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app, params } = context;
    const data = context.data as LoginPostDataInterface;
    let query = params.query;

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
      context.data.entityId = entityData.id;
    } else {
      throw new BadRequest("No entity exists on this entity name.");
    }
    // context.data = data;
    return context;
  };

export default ValidateEntityDataHook;
