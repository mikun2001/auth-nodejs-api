/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import {
  authCredentialPath,
  authenticateJWTPath,
} from "../../../../service_endpoints/services";
import { AuthCredential } from "../../../../db_services/v1/auth-credential/auth-credential.class";
import { BadRequest, FeathersError } from "@feathersjs/errors";
import bcrypt from "bcryptjs";
import { AuthenticateJwt } from "../../authenticate-jwt/authenticate-jwt.class";
import { ValidateAccessTokenResult } from "../../../../utils/AuthHelper/SocialLoginInterfaces";

const ChangePasswordHook =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    const { app, data, params } = context;
    const credentialService = app.service(
      authCredentialPath
    ) as AuthCredential & ServiceAddons<any>;
    const authenticateJWTService = app.service(
      authenticateJWTPath
    ) as AuthenticateJwt & ServiceAddons<any>;

    if (!params.headers || !params.headers.authorization) {
      throw new BadRequest(
        "Invalid login attempt, Access token is required in headers."
      );
    }
    const authResult: ValidateAccessTokenResult = await authenticateJWTService
      .create({}, params)
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
    if (authResult && authResult.authenticated) {
      if (authResult.credential) {
        let credentialData = authResult.credential;
        if (!credentialData.password) {
          throw new BadRequest("You have not added any password.");
        }
        const hashedPrevPassword = credentialData.password;
        const salt = await bcrypt.getSalt(hashedPrevPassword);
        const hashedCurrPassword = await bcrypt.hash(data.oldPassword, salt);

        if (hashedPrevPassword === hashedCurrPassword) {
          credentialData = await credentialService
            .patch(credentialData.id, { password: data.newPassword })
            .catch((err) => {
              throw new BadRequest(err);
            });
          context.result = {
            authenticated: true,
            message: "Password Changed successfully.",
          };
        } else {
          throw new BadRequest("Invalid Old Password. Try forgot password.");
        }
      }
    } else {
      throw authResult;
    }
    return context;
  };

export default ChangePasswordHook;
