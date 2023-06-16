/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 27-02-2023 at 15:49.
 */
import {
  authenticateApplePath,
  authenticateDiscordPath,
  authenticateEmailPasswordPath,
  authenticateEmailPath,
  authenticateFacebookPath,
  authenticateGooglePath,
  authenticateGuestPath,
  authenticateJWTPath,
  authenticateLinkedInPath,
  authenticatePhonePasswordPath,
  authenticatePhonePath,
  authenticateShopifyPath,
  changePasswordPath,
  createCredentialPath,
  deleteCredentialPath,
  forgotPasswordPath,
  logoutPath,
  refreshAccessTokenPath,
  resetPasswordPath,
} from "../service_endpoints/services";
import assert from "assert";
import { AuthSessionDeviceType } from "../db_services/v1/auth-session/intefaces/AuthSessionInterface";
import { BadRequest, FeathersError } from "@feathersjs/errors";
import { Application } from "../../declarations";
import { getAllSessionsData } from "./utils/getAllSessionsData";
import {
  CreateCredentialPostDataInterface,
  EmailPasswordLoginResult,
  GetAllSessionInterface,
  LoginResult,
  LogoutResult,
  ShopifyLoginResult,
} from "./interfaces/PublicMethodInterfaces";
import { AuthCredential_GET } from "../db_services/v1/auth-credential/intefaces/AuthCredentialInterface";

export interface SessionConfigInterface {
  deviceType: AuthSessionDeviceType;
  deviceId: string;
  fcmId?: string;
  ip: string;
}
export class AuthService {
  private static app: Application;

  static initialize(app1: Application): void {
    AuthService.app = app1;
  }
  static async loginWithGoogle(
    accessToken: string,
    entity: string,
    sessionConfig: SessionConfigInterface
  ) {
    const { deviceType, deviceId, fcmId, ip } = sessionConfig;
    return await AuthService.app
      .service(authenticateGooglePath)
      .create({ accessToken, entity, deviceType, deviceId, fcmId, ip })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async loginWithFacebook(
    accessToken: string,
    entity: string,
    sessionConfig: SessionConfigInterface
  ) {
    const { deviceType, deviceId, fcmId, ip } = sessionConfig;
    return await AuthService.app
      .service(authenticateFacebookPath)
      .create({ accessToken, entity, deviceType, deviceId, fcmId, ip })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async loginWithDiscord(
    accessToken: string,
    entity: string,
    sessionConfig: SessionConfigInterface
  ) {
    const { deviceType, deviceId, fcmId, ip } = sessionConfig;
    return await AuthService.app
      .service(authenticateDiscordPath)
      .create({ accessToken, entity, deviceType, deviceId, fcmId, ip })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async loginWithApple(
    accessToken: string,
    entity: string,
    sessionConfig: SessionConfigInterface
  ) {
    const { deviceType, deviceId, fcmId, ip } = sessionConfig;
    return await AuthService.app
      .service(authenticateApplePath)
      .create({ accessToken, entity, deviceType, deviceId, fcmId, ip })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async loginWithLinkedin(
    accessToken: string,
    entity: string,
    sessionConfig: SessionConfigInterface
  ) {
    const { deviceType, deviceId, fcmId, ip } = sessionConfig;
    return await AuthService.app
      .service(authenticateLinkedInPath)
      .create({ accessToken, entity, deviceType, deviceId, fcmId, ip })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async loginWithShopify(
    code: string,
    entity: string,
    storeName: string,
    sessionConfig: SessionConfigInterface
  ): Promise<ShopifyLoginResult> {
    const { deviceType, deviceId, fcmId, ip } = sessionConfig;
    const result = await AuthService.app
      .service(authenticateShopifyPath)
      .create({ code, storeName, entity, deviceType, deviceId, fcmId, ip })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
    return result as ShopifyLoginResult;
  }
  static async createCredential(
    credentialData: CreateCredentialPostDataInterface
  ): Promise<AuthCredential_GET> {
    if (!credentialData.deviceId) {
      assert(
        credentialData.email || credentialData.phone,
        "Must Provide an email or a phone"
      );
    }
    return await AuthService.app
      .service(createCredentialPath)
      .create(credentialData)
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async loginForGuest(
    name: string,
    entity: string,
    sessionConfig: SessionConfigInterface
  ) {
    const { deviceType, deviceId, fcmId, ip } = sessionConfig;
    return await AuthService.app
      .service(authenticateGuestPath)
      .create({
        name,
        entity,
        deviceType,
        deviceId,
        fcmId,
        ip,
      })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async loginWithEmailPassword(
    entity: string,
    email: string,
    password: string,
    sessionConfig: SessionConfigInterface
  ): Promise<EmailPasswordLoginResult> {
    const { deviceType, deviceId, fcmId, ip } = sessionConfig;
    return await AuthService.app
      .service(authenticateEmailPasswordPath)
      .create({
        entity,
        email,
        password,
        deviceType,
        deviceId,
        fcmId,
        ip,
      })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async loginWithPhonePassword(
    entity: string,
    phone: string,
    password: string,
    sessionConfig: SessionConfigInterface
  ) {
    const { deviceType, deviceId, fcmId, ip } = sessionConfig;
    return await AuthService.app
      .service(authenticatePhonePasswordPath)
      .create({
        entity,
        phone,
        password,
        deviceType,
        deviceId,
        fcmId,
        ip,
      })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async verifyAccessToken(headers: Record<string, any>) {
    return await AuthService.app
      .service(authenticateJWTPath)
      .create({}, { headers: headers })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async changePassword(
    headers: Record<string, any>,
    oldPassword: string,
    newPassword: string
  ) {
    return await AuthService.app
      .service(changePasswordPath)
      .create(
        {
          oldPassword,
          newPassword,
        },
        { headers: headers }
      )
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async deleteCredential(
    headers: Record<string, any>,
    password?: string
  ) {
    return await AuthService.app
      .service(deleteCredentialPath)
      .create(
        {
          password,
        },
        { headers: headers }
      )
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async sendOTPToMail(entity: string, email: string, purpose: string) {
    return await AuthService.app
      .service(authenticateEmailPath)
      .create({
        entity,
        email,
        purpose,
      })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async verifyOTPToMail(
    entity: string,
    email: string,
    purpose: string,
    otp: string,
    sessionConfig: SessionConfigInterface
  ) {
    const { deviceType, deviceId, fcmId, ip } = sessionConfig;
    return await AuthService.app
      .service(authenticateEmailPath)
      .patch(null, {
        entity,
        email,
        purpose,
        otp,
        deviceType,
        deviceId,
        fcmId,
        ip,
      })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async sendOTPToPhone(entity: string, phone: string, purpose: string) {
    return await AuthService.app
      .service(authenticatePhonePath)
      .create({
        entity,
        phone,
        purpose,
      })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async verifyOTPToPhone(
    entity: string,
    phone: string,
    purpose: string,
    otp: string,
    name: string,
    sessionConfig: SessionConfigInterface
  ) {
    const { deviceType, deviceId, fcmId, ip } = sessionConfig;
    return await AuthService.app
      .service(authenticatePhonePath)
      .patch(null, {
        entity,
        phone,
        purpose,
        otp,
        name,
        deviceType,
        deviceId,
        fcmId,
        ip,
      })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async sendOTPForForgotPassword(
    purpose: string,
    email?: string,
    phone?: string
  ) {
    return await AuthService.app
      .service(forgotPasswordPath)
      .create({
        email,
        phone,
        purpose,
      })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async verifyOTPForForgotPassword(
    purpose: string,
    otp: string,
    phone?: string,
    email?: string
  ) {
    return await AuthService.app
      .service(forgotPasswordPath)
      .patch(null, {
        purpose,
        otp,
        phone,
        email,
      })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async resetPassword(headers: Record<string, any>, password: string) {
    return await AuthService.app
      .service(resetPasswordPath)
      .create(
        {
          password,
        },
        {
          headers,
        }
      )
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async getAllSessions(data: GetAllSessionInterface) {
    return await getAllSessionsData(data, AuthService.app);
  }
  static async logout(
    headers: Record<string, any>,
    logoutAllDevice = false
  ): Promise<LogoutResult | any> {
    return await AuthService.app
      .service(logoutPath)
      .create({ logoutAllDevice: logoutAllDevice }, { headers: headers })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
  static async refreshAccessToken(
    headers: Record<string, any>,
    sessionConfig: SessionConfigInterface
  ): Promise<LoginResult | any> {
    const { deviceType, deviceId, fcmId, ip } = sessionConfig;
    return await AuthService.app
      .service(refreshAccessTokenPath)
      .create({ deviceType, deviceId, fcmId, ip }, { headers: headers })
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  }
}
