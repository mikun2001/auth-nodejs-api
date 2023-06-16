/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 02-03-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { AuthHelper } from "../../../../utils/AuthHelper/AuthHelper";
import {
  LoginInterface,
  LoginPostDataInterface,
} from "../../../../utils/AuthHelper/AuthHelperInterface";

const CreateAccessToken =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const data = context.data as LoginPostDataInterface;

    const accessTokenData: LoginInterface =
      await AuthHelper.generateAccessToken(data.credentialData);

    data.accessToken = accessTokenData.accessToken;
    context.data = data;
    return context;
  };

export default CreateAccessToken;
