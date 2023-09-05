/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 04-04-2023 at 16:18.
 */
import { ShopifyConfigInterface } from "../../../db_services/v1/auth-config/intefaces/AuthConfigInterfaces";
import { GetAccessTokenForShopifyInterface } from "../../AuthHelper/AuthHelperInterface";
import Axios from "axios";
import { BadRequest } from "@feathersjs/errors";

const getAccessTokenOfShopify = async (
  data: GetAccessTokenForShopifyInterface
): Promise<string> => {
  const config = data.authConfig as ShopifyConfigInterface;
  // console.log(data);
  const url = `https://${data.storeName}.myshopify.com/admin/oauth/access_token?client_id=${config.clientId}&client_secret=${config.clientSecret}&code=${data.code}`;

  const userShopifyData = await Axios.post(url)
    .then((res) => res.data)
    .catch((e) => {
      throw new BadRequest(e.response.data);
    });
  // console.log(userShopifyData);
  return userShopifyData.access_token;
};

export default getAccessTokenOfShopify;
