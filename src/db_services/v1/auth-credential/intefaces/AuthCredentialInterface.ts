/**
 * Created By Abhilash Dash(abhilash@smartters.in) on 27-02-2023 at 15:49.
 */
import { OTPPurposeType } from '../../../../utils/AuthHelper/AuthHelperInterface';

export enum AuthCredentialStatusType {
    ACTIVE = 1,
    DELETED = -1,
}

export interface AuthCredential_GET {
    id: number;
    name: string;
    email: string;
    entityId: number;
    password?: string;
    deviceId: string;
    phone: string;
    status: AuthCredentialStatusType;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface AuthCredential_RESTRICED {
    id?: number;
    name?: string;
    email?: string;
    entityId?: number;
    deviceId?: string;
    phone?: string;
    status?: AuthCredentialStatusType;
}

export interface AuthCredential_FIND {
    total: number;
    skip: number;
    limit: number;
    data: Array<AuthCredential_GET>;
}

export interface AuthCredential_POST {
    name?: string;
    purpose?: OTPPurposeType;
    email?: string;
    entityId: number;
    entity?: string;
    password?: string;
    deviceId?: string;
    phone?: string;
    status: AuthCredentialStatusType;
}
export interface AuthCredential_PATCH {
    id?: number;
    name?: string;
    email?: string;
    entityId?: number;
    password?: string;
    deviceId?: string | null;
    phone?: string;
    status?: AuthCredentialStatusType;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AuthCredential_QUERY {
    id?: number;
    name?: string;
    email?: string;
    entityId?: number;
    password?: string;
    deviceId?: string;
    phone?: string;
    status?: AuthCredentialStatusType;
    createdAt?: Date;
    updatedAt?: Date;
}
