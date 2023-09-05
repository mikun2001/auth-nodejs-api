/**
 * Created By Abhilash Dash ( abhilashdash2023@gmail.com ) on 06-03-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";
import { BadRequest } from "@feathersjs/errors";
import { AuthCredential_GET } from "../../../../db_services/v1/auth-credential/intefaces/AuthCredentialInterface";
import bcrypt from "bcryptjs";
import { EmailPasswordLoginInterface } from "../../../../utils/AuthHelper/AuthHelperInterface";
import { AuthHelper } from "../../../../utils/AuthHelper/AuthHelper";

const HandleEmailPasswordLogin =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { params } = context;
    const data = context.data as EmailPasswordLoginInterface;
    const credentialData: AuthCredential_GET | null =
      await AuthHelper.checkAuthCredentialEmail(data.email, params);
    if (credentialData) {
      if (!credentialData.password) {
        throw new BadRequest("You have not added any password.");
      }
      const hashedPrevPassword = credentialData.password;
      const salt = await bcrypt.getSalt(hashedPrevPassword);
      const hashedCurrPassword = await bcrypt.hash(data.password, salt);

      // console.log('salt => ', salt);
      // console.log('hashedCurrPassword => ', hashedCurrPassword);
      // console.log('hashedPrevPassword => ', hashedPrevPassword);

      // const result = await bcrypt.compare(hashedPassword, hash);

      if (hashedPrevPassword === hashedCurrPassword) {
        data.credentialData = credentialData;
        data.entityId = credentialData.entityId;
      } else {
        throw new BadRequest("Invalid password details");
      }
    } else {
      throw new BadRequest("Invalid email, No user found.");
    }
    context.data = data;
    return context;
  };

export default HandleEmailPasswordLogin;
