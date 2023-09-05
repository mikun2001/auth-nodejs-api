/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 28-02-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
interface profileType {
  payload: string;
  signature: string;
  signatureAlgorithm: string;
}
const HandleTrueCallerLogin =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    // const data = context.data as LoginPostDataInterface;
    // const authConfig = data.authConfig as GoogleConfigInterface;
    //
    // const profile: profileType = {
    //     payload: 'asdf',
    //     signature: 'asdf',
    //     signatureAlgorithm: 'asdf',
    // };
    // const truecallerLogInData: boolean = await loginWithTruecaller(profile);
    //
    // if (truecallerLogInData) {
    //     // data.socialLogInData = truecallerLogInData;
    // }
    // context.data = data;
    return context;
  };

export default HandleTrueCallerLogin;
