import { Application as ApplicationCore } from '../../../declarations';
import moment from 'moment';
import { customAlphabet } from 'nanoid';
import { ServiceAddons } from '@feathersjs/feathers';
import {
    AuthOtp_GET,
    AuthOtp_FIND,
    AuthOtp_QUERY,
    AuthOtp_POST,
    AuthOtpStatusType,
} from '../../db_services/v1/auth-otp/interfaces/AuthOtpInterface';
import { authenticationPath, authOtpPath } from '../../service_endpoints/services';
import { MSG91Utilities } from '../MSG91Utilities/MSG91Utilities';
import { BadRequest } from '@feathersjs/errors';
import { OTPValidateInterface, VerifyOtpInterface } from './AuthHelperInterface';
import { AuthenticationService } from '@feathersjs/authentication';
import { AuthOtp } from '../../db_services/v1/auth-otp/auth-otp.class';

export class OTPHelper {
    private static _otp: { length: number; expireOn: number; viewLog: boolean };
    private static _otpService: AuthOtp & ServiceAddons<any>;
    private static _authenticationService: AuthenticationService & ServiceAddons<any>;

    /**
     * Initialize otp variable with the value available in the default.json
     *
     * @param app - The application object from feathers js.
     */
    static initializeOTP(app: ApplicationCore): void {
        OTPHelper._otp = app.get('otp');
        OTPHelper._otpService = app.service(authOtpPath);
        OTPHelper._authenticationService = app.service(authenticationPath);
    }

    /**
     * Check if current time is greater than or same as given time.
     * @param time - time to check
     * @returns true or false
     */
    static isTimeExpired(time: Date): boolean {
        return moment().isSameOrBefore(moment(time));
    }

    /**
     * Generate new otp.
     * @returns otp.
     */
    static generateOtp(): string {
        if (OTPHelper._otp.viewLog) {
            let otp = '';
            for (let i = 1; i <= OTPHelper._otp.length; i++) {
                otp += i.toString();
            }
            return otp;
        } else {
            const nanoid = customAlphabet('0123456789', OTPHelper._otp.length);
            return nanoid();
        }
    }

    /**
     * store otp to db.
     * @param data - OTP data to store in db.
     */
    static async storeOtp(data: AuthOtp_POST) {
        await OTPHelper._otpService.create(data).catch((e: any) => {
            throw new BadRequest(e.message);
        });
    }

    /**
     * Get OTP if previously stored otherwise a new OTP will be created.
     * @param query - Query to search existing otp.
     * @returns OTP.
     */
    static async getOTP(query: AuthOtp_QUERY): Promise<string> {
        const otpData: AuthOtp_GET | null = await OTPHelper._otpService
            ._find({
                query: {
                    ...query,
                },
            })
            .then((res: AuthOtp_FIND | any) => (res.total ? res.data[0] : null))
            .catch((err) => {
                // console.log('getOTP Error =>', err);
            });

        let otpToSend = '';
        if (otpData) {
            const { otp, expireOn } = otpData;
            if (OTPHelper.isTimeExpired(new Date(expireOn))) {
                otpToSend = OTPHelper.generateOtp();
            } else {
                return otp;
            }
        } else {
            otpToSend = OTPHelper.generateOtp();
        }

        await OTPHelper.storeOtp({
            otp: otpToSend,
            phone: query?.phone,
            email: query?.email,
            purpose: query.purpose!,
            expireOn: moment(new Date())
                .add(OTPHelper._otp.expireOn + 1, 'minutes')
                .format('YYYY-MM-DD HH:MM:SS')
                .toString(),
            token: await OTPHelper._authenticationService.createAccessToken({
                sub: query?.phone,
                expiresIn: `${OTPHelper._otp.expireOn}m`,
            }),
        }).catch((e) => {
            throw e;
        });

        return otpToSend;
    }

    /**
     * Send OTP to phone.
     * @param otp - OTP
     * @param phone - Phone number to which otp will be sent.
     * @param countryCode - Country code respective to the phone number.
     *
     * @returns a success or failure message.
     */
    static async sendOtpToPhone(otp: string, phone: string, countryCode = '91'): Promise<{ message: string }> {
        let message = '';
        if (OTPHelper._otp.viewLog) {
            message = `OTP sent to ${countryCode} ${phone} successfully.`;
        } else {
            const responseFromMsg91 = await MSG91Utilities.sendOTP(otp, phone, countryCode);
            if (!responseFromMsg91) {
                throw new BadRequest(`OTP can not be sent. Please check your mobile number.`);
            } else {
                message = `OTP sent to ${countryCode} ${phone} successfully.`;
            }
        }
        return {
            message: message,
        };
    }

    /**
     * Send OTP to mail.
     * @param otp - OTP
     * @param email - Email address to which otp will be sent.
     *
     * @returns a success or failure message.
     */
    static async sendOtpToEmail(otp: string, email: string): Promise<{ message: string }> {
        let message = '';
        if (OTPHelper._otp.viewLog) {
            message = `OTP sent to ${email} successfully.`;
        }
        /**
         * TODO: Implement send mail through nodemailer with mail template.
         */
        return {
            message: message,
        };
    }

    /**
     * Verify the OTP.
     *
     * If phone otp verification then first verify with gateway and then with db.
     *
     * @param query - Query object for OTP search.
     * @param countryCode - Country code for phone otp verification.
     */
    static async verifyOtp(query: AuthOtp_QUERY, countryCode = '91'): Promise<VerifyOtpInterface> {
        if (!OTPHelper._otp.viewLog) {
            if (query?.phone && query?.otp) {
                const response = await MSG91Utilities.verifyOTP(query.otp, query?.phone, countryCode);
                if (!response) {
                    throw new BadRequest('Invalid OTP');
                }
            }
        }
        const otpData: AuthOtp_GET | null = await OTPHelper._otpService
            ._find({
                query: {
                    ...query,
                    // expireOn: {
                    //     $gte: new Date(),
                    // },
                },
            })
            .then((res: AuthOtp_FIND) => (res.total ? res.data[0] : null));

        if (otpData) {
            return {
                message: 'OTP verified successfully.',
                storedData: otpData,
            };
        } else {
            throw new BadRequest('Invalid OTP');
        }
    }

    /**
     * Remove OTP from db.
     * @param otpId - id of the OTP object.
     */
    static async removeOtp(otpId: string): Promise<void> {
        await OTPHelper._otpService.patch(otpId, { status: AuthOtpStatusType.DELETED }).catch((err) => {
            // console.log(err);
        });
    }

    /**
     * Generate access token for the auth OTP.
     *
     * @param authOtpData - AuthOTP details for whom token will be generated.
     * @param canExpire - tells if the access token can expire or not.
     * @returns The accessToken with the OTP object.
     */
    static async generateOTPAccessToken(authOtpData: AuthOtp_GET, canExpire = true): Promise<OTPValidateInterface> {
        const payload: any = {
            sub: authOtpData.id,
        };
        if (canExpire) payload.expiresIn = OTPHelper._otp.expireOn;
        const accessToken = await OTPHelper._authenticationService.createAccessToken(payload);
        return { accessToken, authOTP: authOtpData };
    }
}
