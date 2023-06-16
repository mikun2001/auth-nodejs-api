/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 02-03-2023 at 14:58.
 */

/**
 * interfaces for OTP
 */
export enum AuthOtpStatusType {
  ACTIVE = 1,
  DELETED = -1,
}
export enum AuthOtpActions {
  LOGIN = "login",
  SIGNUP = "signup",
  FORGOT_PASSWORD = "forgot_password",
}

export interface AuthOtp_GET {
  id: number;
  email?: string;
  phone?: string;
  otp: string;
  expireOn: string;
  token?: string;
  purpose: AuthOtpActions;
  status: AuthOtpStatusType;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthOtp_FIND {
  total: number;
  skip: number;
  limit: number;
  data: Array<AuthOtp_GET>;
}

export interface AuthOtp_POST {
  email?: string;
  phone?: string;
  otp: string;
  expireOn: string;
  token?: string;
  purpose: AuthOtpActions;
}

export interface AuthOtp_QUERY {
  phone?: string;
  email?: string;
  otp?: string;
  status: AuthOtpStatusType;
  $sort?: { createdAt: -1 };
  $limit?: 1;
  purpose?: AuthOtpActions;
  token?: string;
}
