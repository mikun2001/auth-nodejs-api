import { AuthCredential_GET } from "../../db_services/v1/auth-credential/intefaces/AuthCredentialInterface";

/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 16-03-2023 at 16:15.
 */

export interface GetAllSessionInterface {
  guest: boolean;
  deviceId?: string;
  fcmId?: string;
  email?: string;
  phone?: string;
  credentialId?: string;
}
export interface CreateCredentialPostDataInterface {
  name: string;
  entity: string;
  deviceId?: string;
  password?: string;
  email?: string;
  phone?: string;
}
export interface ShopifyLoginResult {
  credential: AuthCredential_GET;
  shopifyAccessToken: string;
  shopDetails: Record<string, any>;
  accessToken: string;
}
export interface EmailPasswordLoginResult {
  accessToken: string;
  credential: AuthCredential_GET;
}
export interface LoginResult {
  accessToken: string;
  credential: AuthCredential_GET;
}
export interface LogoutResult {
  message: string;
}
