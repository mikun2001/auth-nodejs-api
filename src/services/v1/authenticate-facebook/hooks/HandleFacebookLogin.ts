/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 28-02-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { FacebookConfigInterface } from "../../../../db_services/v1/auth-config/intefaces/AuthConfigInterfaces";
import { SocialLoginInterface } from "../../../../utils/AuthHelper/SocialLoginInterfaces";
import { SocialLoginPostDataInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import validateUserWithFacebook from "../../../../utils/SocialLoginUtilities/validateUserWithFacebook";

const HandleFacebookLogin =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const data = context.data as SocialLoginPostDataInterface;
    const authConfig = data.authConfig as FacebookConfigInterface;

    const facebookLogInData: SocialLoginInterface =
      await validateUserWithFacebook(
        data.accessToken,
        authConfig.facebookOauthUrl
      );
    if (facebookLogInData) {
      data.socialLogInData = facebookLogInData;
    }
    context.data = data;
    return context;
  };

export default HandleFacebookLogin;
