/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 06-03-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { AppleConfigInterface } from "../../../../db_services/v1/auth-config/intefaces/AuthConfigInterfaces";
import { SocialLoginInterface } from "../../../../utils/AuthHelper/SocialLoginInterfaces";
import { SocialLoginPostDataInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import validateUserWithApple from "../../../../utils/SocialLoginUtilities/validateUserWithApple";

const HandleAppleLogin =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const data = context.data as SocialLoginPostDataInterface;
    const authConfig = data.authConfig as AppleConfigInterface;

    const appleLogInData: SocialLoginInterface = await validateUserWithApple(
      data.accessToken,
      authConfig.appleOauthUrl,
      authConfig.appleIssuer
    );
    if (appleLogInData) {
      data.socialLogInData = appleLogInData;
    }
    context.data = data;
    return context;
  };

export default HandleAppleLogin;
