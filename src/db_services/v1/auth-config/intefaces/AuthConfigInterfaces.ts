/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 27-02-2023 at 15:49.
 */
export enum AuthConfigStatusType {
  ACTIVE = 1,
  DELETED = -1,
}
export interface StrategyInterface {
  emailPassword?: boolean;
  phonePassword?: boolean;
  phoneOtp?: boolean;
  emailOtp?: boolean;
  google?: boolean;
  facebook?: boolean;
  linkedIn?: boolean;
  discord?: boolean;
  apple?: boolean;
  trueCaller?: boolean;
  guest?: boolean;
  shopify: true;
}
export interface MailConfigInterface {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  signUpEnabled: boolean;
}
export interface PhoneConfigInterface {
  authKey: string;
  sendOtpUrl: string;
  verifyOtpUrl: string;
  sender: string;
  templateId: string;
  signUpEnabled: boolean;
}
export interface GoogleConfigInterface {
  googleOauthUrl: string;
  clientId: string;
  clientSecret: string;
}
export interface FacebookConfigInterface {
  facebookOauthUrl: string;
  clientId: string;
  clientSecret: string;
}
export interface LinkedInConfigInterface {
  linkedinEmailUrl: string;
  linkedinProfileUrl: string;
  clientId: string;
  clientSecret: string;
}
export interface DiscordConfigInterface {
  discordOauthUrl: string;
  clientId: string;
  clientSecret: string;
}
export interface TrueCallerConfigInterface {
  trueCallerOauthUrl: string;
  clientId: string;
  clientSecret: string;
}
export interface ShopifyConfigInterface {
  clientId: string;
  clientSecret: string;
}
export interface AppleConfigInterface {
  appleOauthUrl: string;
  clientId: string;
  clientSecret: string;
  appleIssuer: string;
}
export interface OtpConfigInterface {
  length: number;
  expireOn: number;
  viewLog: boolean;
}

export interface AuthConfig_GET {
  id: number;
  entityId: number;
  strategies: StrategyInterface;
  mailConfig: MailConfigInterface;
  phoneConfig: PhoneConfigInterface;
  googleConfig: GoogleConfigInterface;
  facebookConfig: FacebookConfigInterface;
  linkedInConfig: LinkedInConfigInterface;
  discordConfig: DiscordConfigInterface;
  shopifyConfig: ShopifyConfigInterface;
  trueCallerConfig: TrueCallerConfigInterface;
  appleConfig: AppleConfigInterface;
  otpConfig: OtpConfigInterface;
  status: AuthConfigStatusType;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthConfig_FIND {
  total: number;
  skip: number;
  limit: number;
  data: Array<AuthConfig_GET> | null;
}

export interface AuthConfig_POST {
  strategies: StrategyInterface;
  entityId: number;
  entity: string;
  mailConfig?: MailConfigInterface;
  phoneConfig?: PhoneConfigInterface;
  googleConfig?: GoogleConfigInterface;
  facebookConfig?: FacebookConfigInterface;
  linkedInConfig?: LinkedInConfigInterface;
  discordConfig?: DiscordConfigInterface;
  shopifyConfig?: ShopifyConfigInterface;
  trueCallerConfig?: TrueCallerConfigInterface;
  appleConfig?: AppleConfigInterface;
  otpConfig?: OtpConfigInterface;
}
export interface AuthConfig_PATCH {
  strategies?: StrategyInterface;
  entityId?: number;
  mailConfig?: MailConfigInterface;
  phoneConfig?: PhoneConfigInterface;
  googleConfig?: GoogleConfigInterface;
  facebookConfig?: FacebookConfigInterface;
  linkedInConfig?: LinkedInConfigInterface;
  discordConfig?: DiscordConfigInterface;
  shopifyConfig: ShopifyConfigInterface;
  trueCallerConfig?: TrueCallerConfigInterface;
  appleConfig?: AppleConfigInterface;
  otpConfig?: OtpConfigInterface;
  status?: AuthConfigStatusType;
}

export interface AuthConfig_QUERY {
  strategies?: StrategyInterface;
  entityId?: number;
  mailConfig?: MailConfigInterface;
  phoneConfig?: PhoneConfigInterface;
  googleConfig?: GoogleConfigInterface;
  facebookConfig?: FacebookConfigInterface;
  linkedInConfig?: LinkedInConfigInterface;
  discordConfig?: DiscordConfigInterface;
  shopifyConfig?: ShopifyConfigInterface;
  trueCallerConfig?: TrueCallerConfigInterface;
  appleConfig?: AppleConfigInterface;
  otpConfig?: OtpConfigInterface;
  status?: AuthConfigStatusType;
}
