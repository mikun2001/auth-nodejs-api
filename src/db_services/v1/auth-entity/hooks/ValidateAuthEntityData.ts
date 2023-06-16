/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 06-03-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import { authEntityPath } from "../../../../service_endpoints/services";
import { BadRequest } from "@feathersjs/errors";
import { AuthEntity } from "../auth-entity.class";
import {
  AuthEntity_FIND,
  AuthEntity_GET,
  AuthEntity_POST,
  AuthEntityStatusType,
} from "../intefaces/AuthEntityInterface";

const ValidateAuthEntityData =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app } = context;
    const data = context.data as AuthEntity_POST;
    let query = {};
    const authEntityService = app.service(authEntityPath) as AuthEntity &
      ServiceAddons<any>;
    query = {
      metaName: data.metaName,
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
      throw new BadRequest("Entity exists on this entity name.");
    }
    context.data = data;
    return context;
  };

export default ValidateAuthEntityData;
