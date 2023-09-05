/**
 * Created By Abhilash(Abhilashdash2023@gmail.com) on 9/3/2022 at 9:10 PM.
 */
import { Application as FeathersApplication } from "@feathersjs/feathers";
import { Application } from "../declarations";

/**
 * Returns error messages according to environment of application.
 *
 * @param app - Application object
 * @param errorCode - Type of the error.
 * @param message - Message of the error.
 *
 * @returns A string representing the error message.
 */
const ProductionErrorMessages = {
  google_login: "Failed to authenticate the user with Google.",
  facebook_login: "Failed to authenticate the user with Facebook.",
  facebook_login_email:
    "Please provide email access to the application while authorizing with facebook.",
  apple_login: "Failed to authenticate the user with Apple.",
  apple_login_email:
    "Please provide email access to the application while authorizing with apple.",
  linkedin_login: "Failed to authenticate the user with LinkedIn.",
  linkedin_login_email:
    "Please provide email access to the application while authorizing with linkedin.",
  twitter_login: "Failed to authenticate the user with Twitter.",
  twitter_login_email:
    "Please provide email access to the application while authorizing with twitter.",
  github_login: "Failed to authenticate the user with Github.",
  instagram_connect: "Can not connect to your Instagram account.",
  youtube_connect: "Can not connect to your YouTube account.",
};
const setErrorMessage = (
  app: FeathersApplication | Application,
  errorCode: string,
  message: string
): string => {
  const env = app.get("env");

  const errorMessageConfig: any = ProductionErrorMessages;

  if (env === "production") {
    return errorMessageConfig[errorCode];
  } else {
    return message;
  }
};

export default setErrorMessage;
