/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import { authConfigPath } from "../service_endpoints/services";
import { AuthConfig } from "../db_services/v1/auth-config/auth-config.class";
import { BadRequest } from "@feathersjs/errors";
import {
  AuthConfig_FIND,
  AuthConfig_GET,
  AuthConfigStatusType,
} from "../db_services/v1/auth-config/intefaces/AuthConfigInterfaces";
import {
  AuthServiceType,
  LoginPostDataInterface,
} from "../utils/AuthHelper/AuthHelperInterface";

const SetConfigHook =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app, params } = context;
    const data = context.data as LoginPostDataInterface;
    let query = params.query;

    const authConfigService = app.service(authConfigPath) as AuthConfig &
      ServiceAddons<any>;
    query = {
      entityId: data.entityId,
      status: AuthConfigStatusType.ACTIVE,
      $limit: 1,
    };
    const configData: AuthConfig_GET | null = await authConfigService
      .find({ query })
      .then((res: AuthConfig_FIND | any) =>
        res.total > 0 ? res.data[0] : null
      );

    if (configData) {
      switch (data.authService) {
        case AuthServiceType.google:
          if (configData.strategies.google) {
            data.authConfig = configData.googleConfig;
          } else {
            throw new BadRequest("Google LogIn is not enabled for you.");
          }
          break;
        case AuthServiceType.apple:
          if (configData.strategies.apple) {
            data.authConfig = configData.appleConfig;
          } else {
            throw new BadRequest("apple LogIn is not enabled for you.");
          }
          break;
        case AuthServiceType.facebook:
          if (configData.strategies.facebook) {
            data.authConfig = configData.facebookConfig;
          } else {
            throw new BadRequest("facebook LogIn is not enabled for you.");
          }
          break;
        case AuthServiceType.discord:
          if (configData.strategies.discord) {
            data.authConfig = configData.discordConfig;
          } else {
            throw new BadRequest("discord LogIn is not enabled for you.");
          }
          break;
        case AuthServiceType.linkedIn:
          if (configData.strategies.linkedIn) {
            data.authConfig = configData.linkedInConfig;
          } else {
            throw new BadRequest("linkedIn LogIn is not enabled for you.");
          }
          break;
        case AuthServiceType.phoneOtp:
          if (configData.strategies.phoneOtp) {
            data.authConfig = configData.phoneConfig;
          } else {
            throw new BadRequest("phone_OTP LogIn is not enabled for you.");
          }
          break;
        case AuthServiceType.emailOtp:
          if (configData.strategies.emailOtp) {
            data.authConfig = configData.mailConfig;
          } else {
            throw new BadRequest("email_OTP LogIn is not enabled for you.");
          }
          break;
        case AuthServiceType.trueCaller:
          if (configData.strategies.trueCaller) {
            data.authConfig = configData.trueCallerConfig;
          } else {
            throw new BadRequest("trueCaller LogIn is not enabled for you.");
          }
          break;
        case AuthServiceType.emailPassword:
          if (!configData.strategies.emailPassword) {
            throw new BadRequest(
              "email_password LogIn is not enabled for you."
            );
          }
          break;
        case AuthServiceType.phonePassword:
          if (!configData.strategies.phonePassword) {
            throw new BadRequest(
              "phone_password LogIn is not enabled for you."
            );
          }
          break;
        case AuthServiceType.guest:
          if (!configData.strategies.guest) {
            throw new BadRequest("guest LogIn is not enabled for you.");
          }
          break;
        case AuthServiceType.shopify:
          if (!configData.strategies.shopify) {
            throw new BadRequest("Shopify LogIn is not enabled for you.");
          }
          data.authConfig = configData.shopifyConfig;
          break;
      }
    }

    context.data = data;
    return context;
  };

export default SetConfigHook;
