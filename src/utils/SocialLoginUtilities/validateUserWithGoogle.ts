/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 09-03-2023 at 13:23.
 */

import Axios from "axios";
import {
  SocialLoginInterface,
  SocialLoginErrorCodes,
} from "../AuthHelper/SocialLoginInterfaces";

/**
 * Validate the access token with google server and get the user details
 * from Google.
 *
 * @param accessToken - Access token authorized with google.
 * @param profileUrl - Google Oauth URL.
 *
 * @returns
 * Success - Returns the user related information from google.
 * Failure - Returns an error message.
 */
const validateUserWithGoogle = async (
  accessToken: string,
  profileUrl: string
): Promise<SocialLoginInterface> => {
  // Get user data from google.
  const userGoogleData = await Axios.get(profileUrl, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.data)
    .catch((e) => {
      return e.response.data;
    });

  const { id: googleId, message } = userGoogleData;

  // if user not found return error.
  if (!googleId) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.GOOGLE_LOGIN,
      message,
    };
  }

  // Return the user's data fetched from google.
  const {
    given_name: firstName,
    family_name: lastName,
    email,
    picture,
  } = userGoogleData;
  return {
    result: true,
    socialId: googleId,
    firstName,
    lastName,
    email,
    avatar: picture,
  };
};

export default validateUserWithGoogle;
