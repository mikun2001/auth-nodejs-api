/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 07-03-2023 at 14:38.
 */
import { HookContext } from "@feathersjs/feathers";

/**
 * @description set ip from params.
 * @constructor
 */
const SetIp = () => async (context: HookContext) => {
  const { data, params } = context;
  const { ip } = params;

  data.ip = ip;
  return context;
};

export default SetIp;
