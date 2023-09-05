/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 28-02-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { GoogleConfigInterface } from "../../../../db_services/v1/auth-config/intefaces/AuthConfigInterfaces";
import { SocialLoginInterface } from "../../../../utils/AuthHelper/SocialLoginInterfaces";
import { SocialLoginPostDataInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import validateUserWithGoogle from "../../../../utils/SocialLoginUtilities/validateUserWithGoogle";

const HandleGoogleLogin =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const data = context.data as SocialLoginPostDataInterface;
    const authConfig = data.authConfig as GoogleConfigInterface;

    const googleLogInData: SocialLoginInterface = await validateUserWithGoogle(
      data.accessToken,
      authConfig.googleOauthUrl
    );
    if (googleLogInData) {
      data.socialLogInData = googleLogInData;
    }
    context.data = data;
    return context;
  };

export default HandleGoogleLogin;
