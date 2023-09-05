/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 03-04-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { ShopifyLoginInterface } from "../../../../utils/AuthHelper/SocialLoginInterfaces";
import { ShopifyLoginPostDataInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import validateUserWithShopify from "../../../../utils/SocialLoginUtilities/validateUserWithShopify";

const HandleShopifyLogin =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const data = context.data as ShopifyLoginPostDataInterface;

    const shopifyLogInData: ShopifyLoginInterface =
      await validateUserWithShopify(data.storeName, data.accessToken);
    data.socialLogInData = shopifyLogInData;
    context.result = {
      shopifyAccessToken: data.accessToken,
      shopDetails: shopifyLogInData.shopDetails,
    };

    return context;
  };

export default HandleShopifyLogin;
