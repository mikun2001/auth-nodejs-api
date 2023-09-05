/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 28-02-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { AuthHelper } from "../../../../utils/AuthHelper/AuthHelper";
import { BadRequest } from "@feathersjs/errors";
import { OTPHelper } from "../../../../utils/AuthHelper/OTPHelper";
import { LoginPostDataInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import { AuthOtpStatusType } from "../../../../db_services/v1/auth-otp/interfaces/AuthOtpInterface";

const SendOtpToPhone =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { purpose, phone } = context.data as LoginPostDataInterface;
    const data = context.data as LoginPostDataInterface;

    if (phone && purpose) {
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

export default SendOtpToPhone;
