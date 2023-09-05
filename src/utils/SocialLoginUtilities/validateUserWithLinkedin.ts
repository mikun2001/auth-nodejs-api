/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 09-03-2023 at 13:23.
 */

import Axios from "axios";
import {
  SocialLoginInterface,
  SocialLoginErrorCodes,
} from "../AuthHelper/SocialLoginInterfaces";

/**
 * Validate the access token with linkedIn server and get the user details
 * from LinkedIn.
 *
 * @param accessToken - Access token authorized with linkedIn.
 * @param emailUrl - Email address fetching URL for linkedIn.
 * @param profileUrl - LinkedIn Oauth URL.
 *
 * @returns
 * Success - Returns the user related information from linkedIn.
 * Failure - Returns an error message.
 */
const validateUserWithLinkedin = async (
  accessToken: string,
  emailUrl: string,
  profileUrl: string
): Promise<SocialLoginInterface> => {
  // Get user email address from linkedIn.
  const userLinkedinEmailData = await Axios.get(emailUrl, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    params: {
      q: "members",
      projection: "(elements*(handle~))",
    },
  })
    .then((res) => res.data)
    .catch((e) => {
      return e.response.data;
    });

  const { elements, message: emailErrorMessage } = userLinkedinEmailData;
  if (!elements) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.LINKEDIN_LOGIN,
      message: `Email error - ${emailErrorMessage}`,
    };
  }
  const email = elements[0]["handle~"]["emailAddress"];
  if (!email) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.LINKEDIN_LOGIN_EMAIL,
      message:
        "Please provide email access to the application while authorizing with linkedin.",
    };
  }

  // Get user data from linkedin.
  const userLinkedinData = await Axios.get(profileUrl, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    params: {
      projection:
        "(id,firstName,lastName,profilePicture(displayImage~:playableStreams))",
    },
  })
    .then((res) => res.data)
    .catch((e) => {
      return e.response.data;
    });

  const { id: linkedinId, message } = userLinkedinData;

  // if user not found return error.
  if (!linkedinId) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.LINKEDIN_LOGIN,
      message,
    };
  }

  // Return the user's data fetched from linkedin.
  const { firstName, lastName, profilePicture } = userLinkedinData;
  return {
    result: true,
    socialId: linkedinId,
    firstName: firstName["localized"]["en_US"],
    lastName: lastName["localized"]["en_US"],
    email,
    avatar:
      profilePicture["displayImage~"].elements[3]["identifiers"][0].identifier,
  };
};

export default validateUserWithLinkedin;
