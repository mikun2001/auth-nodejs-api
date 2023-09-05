/**
 * Created By Abhilash(abhilashdash2023@gmail.com) on 06/03/2023 at 14:41.
 */

import axios from "axios";
import { SocialLoginInterface } from "../AuthHelper/SocialLoginInterfaces";
import { BadRequest, NotAuthenticated } from "@feathersjs/errors";

/**
 * Validate the access token with discord server and get the user details
 * from Discord.
 *
 * @param accessToken - Access token authorized with discord.
 * @param profileUrl - discord profile URL.
 *
 * @returns
 * Success - Returns the user related information from discord.
 * Failure - Returns an error message.
 */
const validateUserWithDiscord = async (
  accessToken: string,
  profileUrl: string
): Promise<SocialLoginInterface> => {
  // profileUrl = 'https://discord.com/api/v10/users/@me';

  const {
    data: { id: discordId, username: name, email, avatar },
  } = await axios.get(profileUrl, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  if (!discordId)
    throw new NotAuthenticated("Invalid details for Login with discord");

  if (!email)
    throw new BadRequest(
      "We couldn't find any email from your discord account"
    );

  return {
    result: true,
    name,
    email,
    avatar: avatar
      ? `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png`
      : undefined,
    socialId: discordId,
  };
};

export default validateUserWithDiscord;
