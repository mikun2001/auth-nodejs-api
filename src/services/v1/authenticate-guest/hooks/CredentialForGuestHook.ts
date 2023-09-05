/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import {
  AuthCredential_FIND,
  AuthCredential_GET,
  AuthCredential_POST,
  AuthCredentialStatusType,
} from "../../../../db_services/v1/auth-credential/intefaces/AuthCredentialInterface";
import { GuestLoginInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import { AuthCredential } from "../../../../db_services/v1/auth-credential/auth-credential.class";
import {
  authCredentialPath,
  createCredentialPath,
} from "../../../../service_endpoints/services";

const CredentialForGuestHook =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app } = context;
    const data = context.data as GuestLoginInterface;
    const credentialService = app.service(
      authCredentialPath
    ) as AuthCredential & ServiceAddons<any>;
    const createCredentialService = app.service(
      createCredentialPath
    ) as AuthCredential & ServiceAddons<any>;

    let credentialData: AuthCredential_GET = await credentialService
      .find({
        query: {
          // ...params.query,
          deviceId: data.deviceId,
          status: AuthCredentialStatusType.ACTIVE,
        },
      })
      .then((res: AuthCredential_FIND | any) =>
        res.total ? res.data[0] : null
      )
      .catch((err) => {
        throw new BadRequest(err);
        // console.log('check Auth Credential for guest', err);
      });

    if (!credentialData) {
      const newCredentialData: AuthCredential_POST = {
        name: data.name,
        entityId: data.entityId,
        entity: data.entity,
        deviceId: data.deviceId,
        status: AuthCredentialStatusType.ACTIVE,
      };
      credentialData = await createCredentialService
        .create(newCredentialData, {
          query: {},
          provider: undefined,
        })
        .catch((e: any) => {
          throw e;
        });
    }
    context.data.credentialData = credentialData;
    // context.data = data;
    context.result = credentialData;
    return context;
  };

export default CredentialForGuestHook;
