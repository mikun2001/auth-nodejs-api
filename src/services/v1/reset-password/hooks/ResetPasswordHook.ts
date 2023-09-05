/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import {
  authCredentialPath,
  authOtpPath,
} from "../../../../service_endpoints/services";
import { AuthCredential } from "../../../../db_services/v1/auth-credential/auth-credential.class";
import { BadRequest } from "@feathersjs/errors";
import { AuthOtp } from "../../../../db_services/v1/auth-otp/auth-otp.class";
import {
  AuthOtp_FIND,
  AuthOtp_GET,
  AuthOtpStatusType,
} from "../../../../db_services/v1/auth-otp/interfaces/AuthOtpInterface";
import { AuthCredential_GET } from "../../../../db_services/v1/auth-credential/intefaces/AuthCredentialInterface";
import { OTPHelper } from "../../../../utils/AuthHelper/OTPHelper";

const ResetPasswordHook =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app, data, params } = context;
    let flag = false;

    const otpService = app.service(authOtpPath) as AuthOtp & ServiceAddons<any>;
    const credentialService = app.service(
      authCredentialPath
    ) as AuthCredential & ServiceAddons<any>;

    if (!params.headers || !params.headers.authorization) {
      throw new BadRequest(
        "Invalid login attempt, Access token is required in headers."
      );
    }

    const otpData: AuthOtp_GET = await otpService
      .find({
        query: {
          token: params.headers.authorization,
          status: AuthOtpStatusType.ACTIVE,
        },
      })
      .then((res: AuthOtp_FIND | any) => (res.total ? res.data[0] : null))
      .catch((err) => {
        // console.log('getOTP Error =>', err);
      });
    if (otpData) {
      let query = {};
      if (otpData.email) {
        query = {
          email: otpData.email,
        };
      } else {
        query = {
          phone: otpData.phone,
        };
      }
      const credentialData: AuthCredential_GET = await credentialService
        .find({
          query,
        })
        .then((res: AuthOtp_FIND | any) => (res.total ? res.data[0] : null))
        .catch((err) => {
          // console.log('getOTP Error =>', err);
        });
      if (credentialData) {
        const PatchedCredentialData = await credentialService
          .patch(credentialData.id, { password: data.password })
          .catch((err) => {
            throw new BadRequest(err);
          });
        flag = true;
        context.result = {
          authenticated: true,
          message: "Password changed successfully.",
        };
        await OTPHelper.removeOtp(otpData.id.toString());
      }
    }
    if (!flag) {
      context.result = {
        authenticated: false,
        message: "Invalid AccessToken",
      };
    }

    return context;
  };

export default ResetPasswordHook;
