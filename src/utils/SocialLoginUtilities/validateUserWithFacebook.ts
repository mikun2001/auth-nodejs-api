/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 09-03-2023 at 13:23.
 */

import Axios from "axios";
import {
  SocialLoginInterface,
  SocialLoginErrorCodes,
} from "../AuthHelper/SocialLoginInterfaces";

/**
 * Validate the access token with Facebook server and get the user details
 * from Facebook.
 *
 * @param accessToken - Access token authorized with facebook.
 * @param profileUrl - Facebook Oauth URL.
 *
 * @returns
 * Success - Returns the user related information from facebook.
 * Failure - Returns an error message.
 */
const validateUserWithFacebook = async (
  accessToken: string,
  profileUrl: string
): Promise<SocialLoginInterface> => {
  const userFacebookProfile = await Axios.get(`${profileUrl}/me`, {
    params: {
      access_token: accessToken,
    },
  })
    .then((result) => result.data)
    .catch((e) => {
      return e.response.data;
    });

  const { id: userFacebookId, message: profileErrorMessage } =
    userFacebookProfile;

  if (!userFacebookId) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.FACEBOOK_LOGIN,
      message: `Facebook Profile Error - ${profileErrorMessage}`,
    };
  }

  // Get user data from facebook.
  const userFacebookData = await Axios.get(`${profileUrl}/${userFacebookId}`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    params: {
      fields: "id,name,email,picture,first_name,last_name,middle_name",
    },
  })
    .then((res) => res.data)
    .catch((e) => {
      return e.response.data;
    });

  const { id: facebookId, message } = userFacebookData;

  // if user not found return error.
  if (!facebookId) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.FACEBOOK_LOGIN,
      message,
    };
  }

  // Return the user's data fetched from facebook.
  const {
    first_name: firstName,
    last_name: lastName,
    middle_name: middleName,
    email,
    picture,
  } = userFacebookData;

  // check if email access is there or not.
  if (!email) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.FACEBOOK_LOGIN_EMAIL,
      message:
        "Provide Email access to the application while authorizing with facebook.",
    };
  }

  return {
    result: true,
    socialId: facebookId,
    firstName,
    middleName: middleName,
    lastName,
    email,
    avatar: picture.data.url,
  };
};

export default validateUserWithFacebook;
