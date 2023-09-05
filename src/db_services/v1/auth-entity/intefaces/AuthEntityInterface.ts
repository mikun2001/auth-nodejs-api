/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 27-02-2023 at 15:49.
 */
export enum AuthEntityStatusType {
  ACTIVE = 1,
  DELETED = -1,
}

export interface AuthEntity_GET {
  id: number;
  name: string;
  metaName: string;
  status: AuthEntityStatusType;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthEntity_FIND {
  total: number;
  skip: number;
  limit: number;
  data: Array<AuthEntity_GET>;
}

export interface AuthEntity_POST {
  name: string;
  metaName: string;
  status: AuthEntityStatusType;
}
export interface AuthEntity_PATCH {
  id?: number;
  name?: string;
  metaName?: string;
  status?: AuthEntityStatusType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthEntity_QUERY {
  id?: number;
  name?: string;
  metaName?: string;
  status?: AuthEntityStatusType;
  createdAt?: Date;
  updatedAt?: Date;
}
