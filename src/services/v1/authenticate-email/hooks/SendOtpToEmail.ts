/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 28-02-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { AuthHelper } from "../../../../utils/AuthHelper/AuthHelper";
import { BadRequest } from "@feathersjs/errors";
import { OTPHelper } from "../../../../utils/AuthHelper/OTPHelper";
import { LoginPostDataInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import { AuthOtpStatusType } from "../../../../db_services/v1/auth-otp/interfaces/AuthOtpInterface";

const SendOtpToEmail =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { purpose, email } = context.data as LoginPostDataInterface;

    if (email && purpose) {
      // Validate email address.
      AuthHelper.validateEmail(email);

      // Get OTP.
      const otp = await OTPHelper.getOTP({
        email,
        purpose: purpose,
        status: AuthOtpStatusType.ACTIVE,
      }).catch((e: any) => {
        throw e;
      });
      // Send OTP to the user.
      context.result = await OTPHelper.sendOtpToEmail(otp, email).catch((e) => {
        throw e;
      });
    } else {
      throw new BadRequest("Email verification failure.");
    }
    return context;
  };

export default SendOtpToEmail;
