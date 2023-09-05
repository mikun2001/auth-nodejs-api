/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 09-03-2023 at 13:23.
 */

import Axios from "axios";
import { v1 as uuidv1 } from "uuid";
import crypto from "crypto";
import oauthSignature from "oauth-signature";
import {
  SocialLoginInterface,
  SocialLoginErrorCodes,
} from "../AuthHelper/SocialLoginInterfaces";

/**
 * Validate the access token with twitter server and get the user details
 * from Twitter.
 *
 * @param accessToken - Access token authorized with twitter.
 * @param accessTokenSecret - Access token secret received from twitter.
 * @param twitterOauthUrl - Twitter Oauth URL.
 * @param twitterOauthConsumerKey - Twitter Consumer key.
 * @param twitterOauthConsumerSecret - Twitter Consumer Secret.
 * @param twitterOauthSignatureMethod - Twitter Oauth Signature Method.
 *
 * @returns
 * Success - Returns the user related information from twitter.
 * Failure - Returns an error message.
 */
const validateUserWithTwitter = async (
  accessToken: string,
  accessTokenSecret: string,
  twitterOauthUrl: string,
  twitterOauthConsumerKey: string,
  twitterOauthConsumerSecret: string,
  twitterOauthSignatureMethod: string
): Promise<SocialLoginInterface> => {
  // Get twitter configuration.

  const twitterOauthToken = accessToken;
  const twitterOauthTokenSecret = accessTokenSecret;
  const twitterOauthNonce = uuidv1();
  const twitterOauthTimeStamp = `${Math.floor(new Date().getTime() / 1000.0)}`;
  const twitterOauthVersion = "1.0";
  const include_email = "true";
  const method = "GET";

  // parameters for generating signature.
  const parameters = {
    include_email,
    oauth_consumer_key: twitterOauthConsumerKey,
    oauth_token: twitterOauthToken,
    oauth_signature_method: twitterOauthSignatureMethod,
    oauth_timestamp: twitterOauthTimeStamp,
    oauth_nonce: twitterOauthNonce,
    oauth_version: twitterOauthVersion,
  };

  // generate oauth signature and encode to URI.
  const signatureBaseString = new oauthSignature.SignatureBaseString(
    method,
    twitterOauthUrl,
    parameters
  ).generate();
  const signingKey = twitterOauthConsumerSecret + "&" + twitterOauthTokenSecret;
  let twitterOauthSignature = crypto
    .createHmac("sha1", signingKey)
    .update(signatureBaseString)
    .digest("base64");
  twitterOauthSignature = encodeURIComponent(twitterOauthSignature);

  // Get user data from twitter.
  const userTwitterData = await Axios.get(twitterOauthUrl, {
    headers: {
      include_email: "true",
      Authorization: `OAuth oauth_consumer_key="${twitterOauthConsumerKey}",oauth_token="${twitterOauthToken}",oauth_signature_method="${twitterOauthSignatureMethod}",oauth_timestamp="${twitterOauthTimeStamp}",oauth_nonce="${twitterOauthNonce}",oauth_version="${twitterOauthVersion}",oauth_signature="${twitterOauthSignature}"`,
    },
  })
    .then((res) => res.data)
    .catch((e) => {
      return e.response.data;
    });

  const { id: twitterId, message } = userTwitterData;

  // if user not found return error.
  if (!twitterId) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.TWITTER_LOGIN,
      message,
    };
  }

  // Return the user's data fetched from facebook.
  const { name, email, profile_image_url_https: avatar } = userTwitterData;

  // check if email access is there or not.
  if (!email) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.TWITTER_LOGIN_EMAIL,
      message:
        "Please provide email access to the application while authorizing with twitter.",
    };
  }

  return {
    result: true,
    socialId: twitterId,
    firstName: name,
    email,
    avatar: avatar,
  };
};

export default validateUserWithTwitter;
