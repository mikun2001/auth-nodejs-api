/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import {
  AuthCredential_FIND,
  AuthCredential_GET,
  AuthCredential_PATCH,
  AuthCredential_POST,
  AuthCredentialStatusType,
} from "../../../../db_services/v1/auth-credential/intefaces/AuthCredentialInterface";
import { AuthCredential } from "../../../../db_services/v1/auth-credential/auth-credential.class";
import { authCredentialPath } from "../../../../service_endpoints/services";
import { BadRequest } from "@feathersjs/errors";
import { CreateCredentialInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import { AuthHelper } from "../../../../utils/AuthHelper/AuthHelper";

const CreateCredentialHook =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app } = context;
    const data = context.data as CreateCredentialInterface;
    const credentialService = app.service(
      authCredentialPath
    ) as AuthCredential & ServiceAddons<any>;

    const { email, entityId, password, phone } = data;
    let deviceId = data.deviceId;
    let name = data.name;
    let query = {};
    if (email && (!name || name === "")) {
      const nameMatch = email.match(/^([^@]*)@/);
      name = nameMatch ? nameMatch[1] : "";
    }
    let credentialData: AuthCredential_GET | null;
    if ((!email || email === "") && (!phone || phone === "")) {
      name = "Guest";
      if (!deviceId) {
        throw new BadRequest("Device Id is required for guest Login.");
      }
      query = {
        deviceId: data.deviceId ? data.deviceId : null,
        status: AuthCredentialStatusType.ACTIVE,
      };
    } else {
      deviceId = undefined;
      query = {
        email: email ? email : null,
        phone: phone ? phone : null,
        status: AuthCredentialStatusType.ACTIVE,
      };
    }

    credentialData = data.credentialData;
    credentialData = await credentialService
      .find({
        query,
      })
      .then((res: AuthCredential_FIND | any) =>
        res.total ? res.data[0] : null
      )
      .catch((err) => {
        throw new BadRequest(err);
        // console.log('check Auth Credential Email', err);
      });
    if (!credentialData) {
      if (!name) {
        throw new BadRequest("Please provide your name.");
      }
      const newCredentialData: AuthCredential_POST = {
        name,
        email,
        phone,
        entityId,
        deviceId,
        password,
        status: AuthCredentialStatusType.ACTIVE,
      };
      credentialData = await credentialService
        .create(newCredentialData, {
          query: {},
          provider: undefined,
        })
        .catch((e: any) => {
          throw e;
        });
    } else {
      const patchCredentialData: AuthCredential_PATCH = {
        name,
        email,
        phone,
        entityId,
        deviceId: null,
        password,
        status: AuthCredentialStatusType.ACTIVE,
      };
      credentialData = await credentialService
        .patch(credentialData.id, patchCredentialData)
        .catch((e: any) => {
          throw e;
        });
    }
    context.data = data;
    context.result =
      AuthHelper.restrictCredentialDataFromResponse(credentialData);
    return context;
  };

export default CreateCredentialHook;
