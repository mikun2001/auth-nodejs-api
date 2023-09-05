/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import { AuthCredential_GET } from "../../../../db_services/v1/auth-credential/intefaces/AuthCredentialInterface";
import { CreateCredentialInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import { AuthHelper } from "../../../../utils/AuthHelper/AuthHelper";

const ValidateEmailPhone =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { params } = context;
    const data = context.data as CreateCredentialInterface;
    const { email, phone } = data;

    let credentialData: AuthCredential_GET | null;
    if (email) {
      credentialData = await AuthHelper.checkAuthCredentialEmail(email, params);
      // if (credentialData && data.purpose && data.purpose !== OTPPurposeType.LOGIN) {
      if (credentialData) {
        throw new BadRequest("This email is already Used.");
      } else {
        AuthHelper.validateEmail(email);
      }
    } else {
      if (phone) {
        credentialData = await AuthHelper.checkAuthCredentialPhone(
          phone,
          params
        );
        // if (credentialData && data.purpose && data.purpose !== OTPPurposeType.LOGIN) {
        if (credentialData) {
          throw new BadRequest("This Phone no. is already Used.");
        } else {
          AuthHelper.validatePhoneNumber(phone);
        }
      }
    }
    context.data = data;
    return context;
  };

export default ValidateEmailPhone;
