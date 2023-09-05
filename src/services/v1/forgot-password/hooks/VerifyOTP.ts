/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import {
  ForgotPasswordOTPInterface,
  OTPValidateInterface,
  VerifyOtpInterface,
} from "../../../../utils/AuthHelper/AuthHelperInterface";
import {
  AuthOtp_QUERY,
  AuthOtpStatusType,
} from "../../../../db_services/v1/auth-otp/interfaces/AuthOtpInterface";
import { OTPHelper } from "../../../../utils/AuthHelper/OTPHelper";
import { authOtpPath } from "../../../../service_endpoints/services";
import { AuthOtp } from "../../../../db_services/v1/auth-otp/auth-otp.class";

const VerifyOTP =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app, data } = context;
    const { purpose, email, phone, otp } = data as ForgotPasswordOTPInterface;

    const otpService = app.service(authOtpPath) as AuthOtp & ServiceAddons<any>;

    const otpSearchQuery: AuthOtp_QUERY = {
      purpose: purpose,
      otp,
      status: AuthOtpStatusType.ACTIVE,
    };
    if (email && purpose) {
      otpSearchQuery.email = email;
    } else if (phone && purpose) {
      otpSearchQuery.phone = phone;
    } else {
      throw new BadRequest(
        "OTP verification failure(provide either phone or email)."
      );
    }
    const otpVerificationData: VerifyOtpInterface = await OTPHelper.verifyOtp(
      otpSearchQuery
    ).catch((e) => {
      throw e;
    });
    const { storedData } = otpVerificationData;

    if (storedData) {
      const accessTokenData: OTPValidateInterface =
        await OTPHelper.generateOTPAccessToken(storedData);
      context.result = {
        message: otpVerificationData.message,
        accessToken: accessTokenData.accessToken,
      };
      await otpService
        .patch(storedData.id, {
          token: accessTokenData.accessToken,
        })
        .catch((err) => {
          throw new BadRequest(err);
        });
    } else {
      throw new BadRequest("Invalid Operation.");
    }

    return context;
  };

export default VerifyOTP;
