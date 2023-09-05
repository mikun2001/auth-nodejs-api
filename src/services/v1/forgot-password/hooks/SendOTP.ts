/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import { ForgotPasswordOTPInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import { AuthHelper } from "../../../../utils/AuthHelper/AuthHelper";
import { OTPHelper } from "../../../../utils/AuthHelper/OTPHelper";
import { AuthOtpStatusType } from "../../../../db_services/v1/auth-otp/interfaces/AuthOtpInterface";

const SendOTP =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { purpose, email, phone } =
      context.data as ForgotPasswordOTPInterface;

    if (email && purpose) {
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
    } else if (phone && purpose) {
      // Validate phone number.
      AuthHelper.validatePhoneNumber(phone);

      // Get OTP.
      const otp = await OTPHelper.getOTP({
        phone,
        purpose: purpose,
        status: AuthOtpStatusType.ACTIVE,
      }).catch((e: any) => {
        throw e;
      });
      // Send OTP to the user.
      context.result = await OTPHelper.sendOtpToPhone(otp, phone).catch((e) => {
        throw e;
      });
    } else {
      throw new BadRequest("Phone verification failure(Unable to send OTP).");
    }
    return context;
  };

export default SendOTP;
