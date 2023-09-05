/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import { AuthCredential_GET } from "../../../../db_services/v1/auth-credential/intefaces/AuthCredentialInterface";
import { ForgotPasswordOTPInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import { AuthHelper } from "../../../../utils/AuthHelper/AuthHelper";
import { AuthOtpActions } from "../../../../db_services/v1/auth-otp/interfaces/AuthOtpInterface";

const ValidateEmailPhone =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { params } = context;
    const data = context.data as ForgotPasswordOTPInterface;
    const { email, phone } = data;

    if (data.purpose && data.purpose !== AuthOtpActions.FORGOT_PASSWORD) {
      throw new BadRequest("Invalid Purpose.");
    }
    let credentialData: AuthCredential_GET | null;
    if (email) {
      credentialData = await AuthHelper.checkAuthCredentialEmail(email, params);
      if (!credentialData) {
        throw new BadRequest("No account found on this email.");
      } else {
        data.credentialData = credentialData;
        AuthHelper.validateEmail(email);
      }
    } else {
      if (phone) {
        credentialData = await AuthHelper.checkAuthCredentialPhone(
          phone,
          params
        );
        if (!credentialData) {
          throw new BadRequest("No account found on this phone No.");
        } else {
          data.credentialData = credentialData;
          AuthHelper.validatePhoneNumber(phone);
        }
      } else {
        throw new BadRequest("Must provide a email or phone.");
      }
    }
    return context;
  };

export default ValidateEmailPhone;
