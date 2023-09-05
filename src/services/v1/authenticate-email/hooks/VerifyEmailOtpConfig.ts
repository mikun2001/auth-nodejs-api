/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 02-03-2023 at 20:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { AuthOtpActions } from "../../../../db_services/v1/auth-otp/interfaces/AuthOtpInterface";
import { BadRequest } from "@feathersjs/errors";
import { EmailOTPPostInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import { MailConfigInterface } from "../../../../db_services/v1/auth-config/intefaces/AuthConfigInterfaces";
import { AuthHelper } from "../../../../utils/AuthHelper/AuthHelper";

const VerifyEmailOtpConfig =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { params } = context;
    const data = context.data as EmailOTPPostInterface;
    const authConfig = data.authConfig as MailConfigInterface;

    data.credentialData = await AuthHelper.checkAuthCredentialEmail(
      data.email,
      params
    );

    if (data.purpose === AuthOtpActions.LOGIN) {
      if (!data.credentialData && authConfig.signUpEnabled) {
        throw new BadRequest("You need to signUp first before using this app.");
      }
    } else if (data.purpose === AuthOtpActions.SIGNUP) {
      if (data.credentialData) {
        throw new BadRequest("This email is already used for signup.");
      }
      if (!authConfig.signUpEnabled) {
        throw new BadRequest("You can not signUp using email OTP.");
      }
    } else {
      throw new BadRequest("Invalid purpose, provide either login or signup.");
    }
    return context;
  };

export default VerifyEmailOtpConfig;
