/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 09-03-2023 at 13:23.
 */

import jwksClient from "jwks-rsa";
import jwt, { Algorithm } from "jsonwebtoken";
import {
  SocialLoginInterface,
  SocialLoginErrorCodes,
} from "../AuthHelper/SocialLoginInterfaces";

/**
 * Validate the access token with apple server and get the user details
 * from Apple.
 *
 * @param accessToken - Access token authorized with Apple.
 * @param appleOauthUrl - Oauth URL for apple.
 * @param appleIssuerUrl - Issuer id for apple.
 *
 * @returns
 * Success - Returns the user related information from apple.
 * Failure - Returns an error message.
 */
const validateUserWithApple = async (
  accessToken: string,
  appleOauthUrl: string,
  appleIssuerUrl: string
): Promise<SocialLoginInterface> => {
  // Decode the JWT access token to get kid and alg.
  const decoded = jwt.decode(accessToken, { complete: true });
  if (!decoded) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.APPLE_LOGIN,
      message: "Invalid Apple access token",
    };
  }
  const { kid, alg } = decoded.header;

  // Get the signing key from apple server.
  const signingKey = await jwksClient({
    jwksUri: appleOauthUrl,
    cache: true,
  })
    .getSigningKey(kid)
    .then((key) => {
      if ("rsaPublicKey" in key) {
        return key.rsaPublicKey;
      } else {
        return null;
      }
    });
  if (!signingKey) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.APPLE_LOGIN,
      message: "Can not fetch signing key for apple.",
    };
  }

  // verify the jwt with the signing key and algorithm.
  const userAppleData: any = jwt.verify(accessToken, signingKey, {
    issuer: appleIssuerUrl,
    algorithms: [alg as Algorithm],
  });

  const { sub: appleId } = userAppleData;

  // if user not found return error.
  if (!appleId) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.APPLE_LOGIN,
      message: "Apple Authentication Failed. User not Found.",
    };
  }

  // Return the user's data fetched from google.
  const { email } = userAppleData;

  // check if email access is there or not.
  if (!email) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.APPLE_LOGIN_EMAIL,
      message:
        "Please provide email access to the application while authorizing with apple.",
    };
  }

  return {
    result: true,
    socialId: appleId,
    email,
  };
};

export default validateUserWithApple;
