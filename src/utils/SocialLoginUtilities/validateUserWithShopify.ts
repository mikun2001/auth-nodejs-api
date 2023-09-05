/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 09-03-2023 at 13:23.
 */

import Axios from "axios";
import {
  SocialLoginErrorCodes,
  ShopifyLoginInterface,
} from "../AuthHelper/SocialLoginInterfaces";
import { LATEST_API_VERSION } from "@shopify/shopify-api";
import { BadRequest } from "@feathersjs/errors";

/**
 * Validate the access token with shopify server and get the user details
 * from Google.
 *
 * @param storeName - name of the store
 * @param accessToken - Access token authorized with shopify.
 *
 * @returns
 * Success - Returns the user related information from shopify.
 * Failure - Returns an error message.
 */
const validateUserWithShopify = async (
  storeName: string,
  accessToken: string
): Promise<ShopifyLoginInterface> => {
  // Get user data from shopify.
  // console.log(storeName, accessToken);
  const shopUrl = `https://${storeName}.myshopify.com/admin/api/${LATEST_API_VERSION}/shop.json`;

  const shopDetails = await Axios.get(shopUrl, {
    headers: {
      "X-Shopify-Access-Token": accessToken,
      Authorization: "none",
    },
  })
    .then((res) => res.data.shop)
    .catch((e) => {
      throw new BadRequest("shop details Error ", e.response.data);
    });
  // console.log('shopData => ', shopDetails);
  if (!shopDetails || !shopDetails.id) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.SHOPIFY_LOGIN,
      message: "Invalid access",
    };
  }

  // Return the shop's data fetched from shopify.
  return {
    result: true,
    name: shopDetails.name,
    email: shopDetails.domain,
    shopDetails: shopDetails,
  };
};

export default validateUserWithShopify;
