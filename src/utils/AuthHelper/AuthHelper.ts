import { Params, ServiceAddons } from '@feathersjs/feathers';
import { authenticationPath } from '../../service_endpoints/services';
import { LoginInterface } from './AuthHelperInterface';
import { BadRequest } from '@feathersjs/errors';
import { Application as ApplicationCore } from '../../../declarations';
import { AuthenticationService } from '@feathersjs/authentication';
import { AuthCredential } from '../../db_services/v1/auth-credential/auth-credential.class';
import { authCredentialPath, authSessionPath } from '../../service_endpoints/services';
import {
    AuthCredential_FIND,
    AuthCredential_GET,
    AuthCredential_POST,
    AuthCredential_RESTRICED,
    AuthCredentialStatusType,
} from '../../db_services/v1/auth-credential/intefaces/AuthCredentialInterface';
import { AuthSession_GET, AuthSession_POST } from '../../db_services/v1/auth-session/intefaces/AuthSessionInterface';
import { AuthSession } from '../../db_services/v1/auth-session/auth-session.class';

export class AuthHelper {
    private static _credentialService: AuthCredential & ServiceAddons<any>;
    private static _sessionService: AuthSession & ServiceAddons<any>;
    private static _authenticationService: AuthenticationService & ServiceAddons<any>;
    private static _expirationTime: number;

    /**
     * Initialize service with the Credential path.
     *
     * @param app - The application object from feathers js.
     */
    static initializeAuth(app: ApplicationCore): void {
        AuthHelper._credentialService = app.service(authCredentialPath);
        AuthHelper._sessionService = app.service(authSessionPath);
        AuthHelper._authenticationService = app.service(authenticationPath);
        AuthHelper._expirationTime = app.get('otp').expireOn;
    }

    /**
     * Verifies if phone number is valid or not.
     * @param phone - phone number
     */
    static validatePhoneNumber(phone: string): void {
        if (!/^(([0-9 +_\-,.^*?$^#()])|(ext|x)){1,20}$/.test(phone)) {
            throw new BadRequest('Please provide a valid phone number!');
        }
    }

    /**
     * Verifies if phone number is valid or not.
     * @param email - email address
     */
    static validateEmail(email: string): void {
        // console.log(email);
        if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email,
            ) &&
            !email.includes('.myshopify.com')
        ) {
            throw new BadRequest('Please provide a valid Email address.');
        }
    }

    /**
     * Check if any existing auth_credential with same email id and retrieve its data.
     *
     * @param email - Email address based on which search will be performed.
     * @param params - Feathers Params object.
     *
     * @returns The auth credential object if found otherwise null.
     */
    static async checkAuthCredentialEmail(email: string, params: Params): Promise<AuthCredential_GET | null> {
        return await AuthHelper._credentialService
            ._find({
                query: {
                    ...params.query,
                    email,
                    status: AuthCredentialStatusType.ACTIVE,
                },
            })
            .then((res: AuthCredential_FIND | any) => (res.total ? res.data[0] : null))
            .catch((err) => {
                // console.log('checkAuthCredentialEmail', err);
            });
    }

    /**
     * Check if any existing authCredential with same email id and retrieve its data.
     *
     * @param phone - Phone number based on which search will be performed.
     * @param params - Feathers Params object.
     *
     * @returns The authCredential object if found otherwise null.
     */
    static async checkAuthCredentialPhone(phone: string, params: Params): Promise<AuthCredential_GET | null> {
        return await AuthHelper._credentialService
            ._find({
                query: {
                    ...params.query,
                    phone,
                    status: AuthCredentialStatusType.ACTIVE,
                },
            })
            .then((res: AuthCredential_FIND) => (res.total ? res.data[0] : null));
    }

    /**
     * Generate access token for the auth Credential.
     *
     * @param authCredentialData - AuthCredential details for whom token will be generated.
     * @param canExpire - tells if the access token can expire or not.
     * @returns The accessToken with the credential object.
     */
    static async generateAccessToken(
        authCredentialData: AuthCredential_GET,
        canExpire = false,
    ): Promise<LoginInterface> {
        const payload: any = {
            sub: authCredentialData.id,
        };
        if (canExpire) payload.expiresIn = `${AuthHelper._expirationTime}m`;
        const accessToken = await AuthHelper._authenticationService.createAccessToken(payload);
        return { accessToken, authCredential: authCredentialData };
    }

    /**
     * Create AuthCredential's account return the result associated with an access token.
     *
     * @param data - Data needed for the AuthCredential create method.
     *
     * @returns The AuthCredential object and access token.
     */
    static async createAuthCredentialAccount(data: AuthCredential_POST): Promise<AuthCredential_GET> {
        return await AuthHelper._credentialService
            .create(
                {
                    ...data,
                },
                {
                    query: {},
                    provider: undefined,
                },
            )
            .catch((e: any) => {
                throw e;
            });
    }
    /**
     * Create AuthSession's account return the result associated with an access token.
     *
     * @param data - Data needed for the AuthSession create method.
     *
     * @returns The AuthSession object and access token.
     */
    static async createAuthSession(data: AuthSession_POST): Promise<AuthSession_GET> {
        return await AuthHelper._sessionService
            .create(
                {
                    ...data,
                },
                {
                    query: {},
                    provider: undefined,
                },
            )
            .catch((e: any) => {
                throw e;
            });
    }

    static restrictCredentialDataFromResponse(data: AuthCredential_GET | null): AuthCredential_RESTRICED {
        let result: AuthCredential_RESTRICED = {};
        if (data) {
            result = {
                id: data.id,
                name: data.name,
                email: data.email,
                entityId: data.entityId,
                deviceId: data.deviceId,
                phone: data.phone,
                status: data.status,
            };
        }
        return result;
    }
    // /**
    //  * Update the AuthCredential's email or phone as verified.
    //  * @param AuthCredentialId - id of the AuthCredential to be updated.
    //  * @param data - Data to be updated.
    //  * @param params - Params object feathers.
    //  *
    //  * @returns updated AuthCredential object.
    //  */
    // static async updateAuthCredentialAndAuthenticate(authCredentialId: string, data: UpdateAuthCredential, params: Params): Promise<User_GET> {
    //     return await AuthHelper._credentialService._patch(
    //         userId,
    //         {
    //             ...data,
    //         },
    //         {
    //             query: {
    //                 ...params.query,
    //             },
    //         },
    //     );
    // }
}
