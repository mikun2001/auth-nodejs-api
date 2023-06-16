/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import {
  AuthCredential_GET,
  AuthCredential_POST,
  AuthCredentialStatusType,
} from "../db_services/v1/auth-credential/intefaces/AuthCredentialInterface";
import { CreateCredentialInterface } from "../utils/AuthHelper/AuthHelperInterface";
import { AuthCredential } from "../db_services/v1/auth-credential/auth-credential.class";
import { createCredentialPath } from "../service_endpoints/services";
import { AuthHelper } from "../utils/AuthHelper/AuthHelper";

const CheckCredentialHook =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app, params } = context;
    const data = context.data as CreateCredentialInterface;
    const socialLogInData = data.socialLogInData;

    const createCredentialService = app.service(
      createCredentialPath
    ) as AuthCredential & ServiceAddons<any>;

    if (socialLogInData !== undefined) {
      if (!socialLogInData.result) {
        throw new BadRequest(
          socialLogInData.errorCode + ": " + socialLogInData.message
        );
      }
      const { firstName, middleName, lastName } = socialLogInData;
      if (socialLogInData.email) data.email = socialLogInData.email;
      if (socialLogInData.phone) data.phone = socialLogInData.phone;
      data.name = socialLogInData.name
        ? socialLogInData.name
        : `${firstName ? firstName : ""}${middleName ? " " + middleName : ""}${
            lastName ? " " + lastName : undefined
          }`;
    }

    const { email, phone } = data;
    let name = data.name;

    if (!name && email) {
      const nameMatch = email.match(/^([^@]*)@/);
      if (nameMatch) name = nameMatch[1];
    }

    if (name) {
      data.name = name;
    }
    let credentialData: AuthCredential_GET | null = data.credentialData;
    if (email) {
      credentialData = await AuthHelper.checkAuthCredentialEmail(email, params);
    } else if (phone) {
      credentialData = await AuthHelper.checkAuthCredentialPhone(phone, params);
    } else {
      throw new BadRequest("Invalid data. No phone no. or email found.");
    }
    if (!credentialData) {
      const newCredentialData: AuthCredential_POST = {
        name: name,
        email: email,
        phone: phone,
        purpose: data.purpose,
        entityId: data.entityId,
        entity: data.entity,
        deviceId: data.deviceId,
        password: data.password,
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

    data.credentialData = credentialData;
    context.data = data;
    context.result = {
      credential: AuthHelper.restrictCredentialDataFromResponse(credentialData),
      ...context.result,
    };
    return context;
  };

export default CheckCredentialHook;
