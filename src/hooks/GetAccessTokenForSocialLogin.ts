/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 04-04-2023 at 16:18.
 */
import { HookContext } from "@feathersjs/feathers";
import { ShopifyConfigInterface } from "../db_services/v1/auth-config/intefaces/AuthConfigInterfaces";
import {
  AuthServiceType,
  GetAccessTokenForShopifyInterface,
} from "../utils/AuthHelper/AuthHelperInterface";
import { BadRequest } from "@feathersjs/errors";
import getAccessTokenOfShopify from "../utils/SocialLoginUtilities/GenerateAccessToken/getAccessTokenOfShopify";

const GetAccessTokenForSocialLogin =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const data = context.data as GetAccessTokenForShopifyInterface;

    if (data.code) {
      switch (data.authService) {
        case AuthServiceType.google:
          break;
        case AuthServiceType.apple:
          break;
        case AuthServiceType.facebook:
          break;
        case AuthServiceType.discord:
          break;
        case AuthServiceType.linkedIn:
          break;
        case AuthServiceType.trueCaller:
          break;
        case AuthServiceType.shopify:
          context.data.accessToken = await getAccessTokenOfShopify(data);
          break;
      }
    } else {
      throw new BadRequest("Code is required.");
    }
    return context;
  };

export default GetAccessTokenForSocialLogin;
