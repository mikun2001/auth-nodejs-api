/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 28-02-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { LinkedInConfigInterface } from "../../../../db_services/v1/auth-config/intefaces/AuthConfigInterfaces";
import { SocialLoginInterface } from "../../../../utils/AuthHelper/SocialLoginInterfaces";
import { SocialLoginPostDataInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import validateUserWithLinkedin from "../../../../utils/SocialLoginUtilities/validateUserWithLinkedin";

const HandleLinkedInLogin =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const data = context.data as SocialLoginPostDataInterface;
    const authConfig = data.authConfig as LinkedInConfigInterface;

    const linkedInLogInData: SocialLoginInterface =
      await validateUserWithLinkedin(
        data.accessToken,
        authConfig.linkedinEmailUrl,
        authConfig.linkedinProfileUrl
      );
    if (linkedInLogInData) {
      data.socialLogInData = linkedInLogInData;
    }
    context.data = data;
    return context;
  };

export default HandleLinkedInLogin;
