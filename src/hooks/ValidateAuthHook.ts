/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 28-02-2023 at 13:37.
 */
import { HookContext, ServiceAddons } from "@feathersjs/feathers";
import { BadRequest, FeathersError } from "@feathersjs/errors";
import { authenticateJWTPath } from "../service_endpoints/services";
import { AuthenticateJwt } from "../services/v1/authenticate-jwt/authenticate-jwt.class";

const ValidateAuthHook =
  (path = "") =>
  async (context: HookContext): Promise<HookContext> => {
    const { app, params } = context;
    if (path === "") {
      path = app.get("authentication").service;
    }

    const authenticateJWTService = app.service(
      authenticateJWTPath
    ) as AuthenticateJwt & ServiceAddons<any>;

    const result: any = await authenticateJWTService
      .create({}, { headers: params.headers })
      .catch((err: FeathersError) => {
        throw err;
      });
    // console.log(result.credential.id);
    context.params.authenticated = result.authenticated;

    const userService = app.service(path);

    // console.log(context.params.authentication?.accessToken);
    if (result.authenticated) {
      const user: any = await userService
        .find({
          query: {
            auth_credential_id: result.credential.id,
            status: 1,
          },
          paginate: false,
        })
        .then((res: any) => (res.length > 0 ? res[0] : null));

      // console.log(user);
      context.params.user = user;
    } else {
      throw new BadRequest(result.message);
    }

    return context;
  };

export default ValidateAuthHook;
