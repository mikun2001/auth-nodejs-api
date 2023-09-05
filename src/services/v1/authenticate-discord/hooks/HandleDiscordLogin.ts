/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 06-03-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { DiscordConfigInterface } from "../../../../db_services/v1/auth-config/intefaces/AuthConfigInterfaces";
import { SocialLoginInterface } from "../../../../utils/AuthHelper/SocialLoginInterfaces";
import { SocialLoginPostDataInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import validateUserWithDiscord from "../../../../utils/SocialLoginUtilities/validateUserWithDiscord";

const HandleDiscordLogin =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const data = context.data as SocialLoginPostDataInterface;
    const authConfig = data.authConfig as DiscordConfigInterface;

    const discordLogInData: SocialLoginInterface =
      await validateUserWithDiscord(
        data.accessToken,
        authConfig.discordOauthUrl
      );
    if (discordLogInData) {
      data.socialLogInData = discordLogInData;
    }
    context.data = data;
    return context;
  };

export default HandleDiscordLogin;
