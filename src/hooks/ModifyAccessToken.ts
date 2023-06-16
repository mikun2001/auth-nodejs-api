/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 02-03-2023 at 13:37.
 */
import { HookContext } from "@feathersjs/feathers";

const ModifyAccessToken =
  () =>
  async (context: HookContext): Promise<HookContext> => {
    if (
      context.params &&
      context.params.query &&
      "accessToken" in context.params.query
    ) {
      context.params.query = {
        ...context.params.query,
        accessToken: context.params.query.accessToken.replace("Bearer ", ""),
      };
    }
    if (context.data && "accessToken" in context.data) {
      context.data = {
        ...context.data,
        accessToken: context.data.accessToken.replace("Bearer ", ""),
      };
    }
    return context;
  };

export default ModifyAccessToken;
