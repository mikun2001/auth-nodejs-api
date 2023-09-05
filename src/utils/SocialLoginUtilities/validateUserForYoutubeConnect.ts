/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 09-03-2023 at 13:23.
 */

import axios from "axios";
import {
  ConnectInterface,
  SocialLoginErrorCodes,
} from "../AuthHelper/SocialLoginInterfaces";

/**
 * Validate the access token with youtube and get the user details
 * from YouTube.
 *
 * @param accessToken - Access token authorized with youtube.
 * @param profileUrl - YouTube Oauth URL.
 *
 * @returns
 * Success - Returns the user related information from youtube.
 * Failure - Returns an error message.
 */
const validateUserForYoutubeConnect = async (
  accessToken: string,
  profileUrl: string
): Promise<ConnectInterface> => {
  // Get user data from youtube.
  const userYoutubeData = await axios
    .get(profileUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        mine: true,
        part: "snippet,statistics",
      },
    })
    .then((res) => res.data)
    .catch((e) => {
      return e.response.data;
    });

  const { items, kind, message } = userYoutubeData;

  // if user not found return error.
  if (!items || !kind) {
    return {
      result: false,
      errorCode: SocialLoginErrorCodes.YOUTUBE_CONNECT,
      message,
    };
  }

  // Return the user's data fetched from youtube.
  return {
    result: true,
    socialId: items[0].id, // Channel Id
    username: items[0]["snippet"].title, // Channel Title
  };
};

export default validateUserForYoutubeConnect;
