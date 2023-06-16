/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 27-02-2023 at 15:49.
 */
import { AuthCredential_GET } from "../../auth-credential/intefaces/AuthCredentialInterface";

export enum AuthSessionStatusType {
  ACTIVE = 1,
  DELETED = -1,
}
export enum AuthSessionDeviceType {
  WEB = 1,
  ANDROID = 2,
  IOS = 3,
}

export interface AuthSession_GET {
  id: number;
  credentialId: number;
  fcmId: string;
  deviceId: string;
  deviceType: AuthSessionDeviceType;
  accessToken: string;
  ip: string;
  endedOn?: Date;
  status: AuthSessionStatusType;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession_FIND {
  total: number;
  skip: number;
  limit: number;
  data: Array<AuthSession_GET>;
}

export interface AuthSession_POST {
  credentialId?: number;
  credentialData?: AuthCredential_GET;
  fcmId?: string;
  deviceId?: string;
  deviceType?: AuthSessionDeviceType;
  accessToken?: string;
  ip?: string;
  endedOn?: Date;
  status?: AuthSessionStatusType;
}
export interface AuthSession_PATCH {
  credentialId?: number;
  fcmId?: string;
  deviceId?: string;
  deviceType?: AuthSessionDeviceType;
  accessToken?: string;
  ip?: string;
  endedOn?: Date;
  status?: AuthSessionStatusType;
}

export interface AuthSession_QUERY {
  id?: number;
  credentialId?: number;
  fcmId?: string;
  deviceId?: string;
  deviceType?: AuthSessionDeviceType;
  accessToken?: string;
  ip?: string;
  endedOn?: Date | null;
  status?: AuthSessionStatusType;
  createdAt?: Date;
  updatedAt?: Date;
}
