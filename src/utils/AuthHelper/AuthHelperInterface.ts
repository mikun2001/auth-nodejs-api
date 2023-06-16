import { AuthCredential_GET } from '../../db_services/v1/auth-credential/intefaces/AuthCredentialInterface';
import {
    AuthSession_GET,
    AuthSessionDeviceType,
} from '../../db_services/v1/auth-session/intefaces/AuthSessionInterface';
import { ShopifyLoginInterface, SocialLoginInterface } from './SocialLoginInterfaces';
import { AuthOtp_GET, AuthOtpActions } from '../../db_services/v1/auth-otp/interfaces/AuthOtpInterface';
import { ShopifyLoginResult } from '../../public_methods/interfaces/PublicMethodInterfaces';

/**
 * Interfaces related with AuthHelper class.
 */
export interface LoginInterface {
    accessToken: string;
    authCredential: AuthCredential_GET;
}
export interface OTPValidateInterface {
    accessToken: string;
    authOTP: AuthOtp_GET;
}
export enum OTPPurposeType {
    LOGIN = 'login',
    SIGNUP = 'signup',
}
export interface VerifyOtpInterface {
    message: string;
    storedData?: AuthOtp_GET;
}
export enum AuthServiceType {
    emailPassword = 1,
    phonePassword = 2,
    phoneOtp = 3,
    emailOtp = 4,
    google = 5,
    facebook = 6,
    linkedIn = 7,
    discord = 8,
    apple = 9,
    trueCaller = 10,
    guest = 11,
    shopify = 12,
}
export interface LoginPostDataInterface {
    otp?: string;
    name: string;
    authService: AuthServiceType;
    purpose?: AuthOtpActions;
    email?: string;
    phone?: string;
    password?: string;
    authConfig: object;
    accessToken: string;
    entity: string;
    entityId: number;
    ip: string;
    deviceType: AuthSessionDeviceType;
    deviceId: string;
    fcmId?: string;
    socialLogInData: SocialLoginInterface;
    credentialData: AuthCredential_GET;
    sessionData: AuthSession_GET;
}
export interface GetAccessTokenForShopifyInterface {
    authService: AuthServiceType;
    code: string;
    storeName: string;
    authConfig: object;
    accessToken: string;
    scopes: Array<string>;
    entity: string;
    entityId: number;
}
export interface EmailOTPPostInterface {
    authService: AuthServiceType;
    purpose?: AuthOtpActions;
    email: string;
    authConfig: object;
    entity: string;
    entityId: number;
    credentialData: AuthCredential_GET | null;
}
export interface PhoneOTPPostInterface {
    authService: AuthServiceType;
    purpose?: AuthOtpActions;
    phone: string;
    authConfig: object;
    entity: string;
    entityId: number;
    credentialData: AuthCredential_GET | null;
}
export interface ForgotPasswordOTPInterface {
    otp?: string;
    purpose?: AuthOtpActions;
    phone?: string;
    email?: string;
    authConfig: object;
    entity: string;
    entityId: number;
    credentialData: AuthCredential_GET | null;
}

export interface SocialLoginPostDataInterface {
    authService: AuthServiceType;
    authConfig: object;
    accessToken: string;
    entity: string;
    entityId: number;
    socialLogInData: SocialLoginInterface;
}
export interface ShopifyLoginPostDataInterface {
    code: string;
    storeName: string;
    scopes: Array<string>;
    authService: AuthServiceType;
    authConfig: object;
    accessToken: string;
    entity: string;
    entityId: number;
    socialLogInData: ShopifyLoginInterface;
    ip: string;
    deviceType: AuthSessionDeviceType;
    deviceId: string;
    fcmId?: string;
    shopifyResult: ShopifyLoginResult;
}
export interface EmailPasswordLoginInterface {
    email: string;
    password: string;
    ip: string;
    deviceType: AuthSessionDeviceType;
    deviceId: string;
    fcmId?: string;
    entity: string;
    entityId: number;
    credentialData: AuthCredential_GET;
}
export interface PhonePasswordLoginInterface {
    phone: string;
    password: string;
    ip: string;
    deviceType: AuthSessionDeviceType;
    deviceId: string;
    fcmId?: string;
    entityId: number;
    credentialData: AuthCredential_GET;
}
export interface CreateCredentialInterface {
    name: string;
    purpose: OTPPurposeType;
    email?: string;
    phone?: string;
    entity: string;
    entityId: number;
    deviceId?: string;
    password?: string;
    socialLogInData: SocialLoginInterface;
    credentialData: AuthCredential_GET | null;
}
export interface GuestLoginInterface {
    name: string;
    entity: string;
    entityId: number;
    deviceId: string;
    credentialData: AuthCredential_GET | null;
}
export interface CreateSessionInterface {
    entityId: number;
    ip: string;
    deviceType: AuthSessionDeviceType;
    deviceId: string;
    fcmId?: string;
    credentialData: AuthCredential_GET;
}
