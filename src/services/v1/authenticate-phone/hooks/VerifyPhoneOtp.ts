/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 28-02-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import {
  AuthOtp_QUERY,
  AuthOtpStatusType,
} from "../../../../db_services/v1/auth-otp/interfaces/AuthOtpInterface";
import { BadRequest } from "@feathersjs/errors";
import { OTPHelper } from "../../../../utils/AuthHelper/OTPHelper";
import {
  LoginPostDataInterface,
  VerifyOtpInterface,
} from "../../../../utils/AuthHelper/AuthHelperInterface";

const VerifyPhoneOtp =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const data = context.data as LoginPostDataInterface;

    const { phone, purpose, otp } = data;
    const otpSearchQuery: AuthOtp_QUERY = {
      phone: phone,
      purpose: purpose,
      otp,
      status: AuthOtpStatusType.ACTIVE,
    };

    const otpVerificationData: VerifyOtpInterface = await OTPHelper.verifyOtp(
      otpSearchQuery
    ).catch((e) => {
      throw e;
    });
    const { storedData } = otpVerificationData;

    if (storedData) {
      await OTPHelper.removeOtp(storedData.id.toString());
    } else {
      throw new BadRequest("Invalid Operation.");
    }
    return context;
  };

export default VerifyPhoneOtp;
