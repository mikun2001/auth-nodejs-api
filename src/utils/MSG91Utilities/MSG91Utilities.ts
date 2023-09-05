import { FlowType, MSG91Config, OTPConfig } from './MSG91Interfaces';
import { Application } from '../../../declarations';
import Axios, { AxiosRequestConfig } from 'axios';

/**
 * The utilities for use with MSG91.
 */
export class MSG91Utilities {
    private static _msg91: MSG91Config;
    private static _otp: OTPConfig;

    /**
     * Initialize the msg91 and otp variable with the value available in the default.json
     *
     * @param app - The application object from feathers js.
     */
    static initializeMSG91(app: Application): void {
        MSG91Utilities._msg91 = app.get('msg91');
        MSG91Utilities._otp = app.get('otp');
    }

    /**
     * Send OTP through MSG91.
     *
     * @param otp - OTP to be sent.
     * @param phone - Phone number to which the OTP will be sent.
     * @param countryCode - Country code to be attached with phone number to send OTP.
     *
     * @returns True or False based upon the response from MSG91
     */
    static async sendOTP(otp: string, phone: string, countryCode: string): Promise<boolean> {
        const axiosConfig: AxiosRequestConfig = {
            url: MSG91Utilities._msg91.sendOTPUrl,
            params: {
                mobile: `${countryCode}${phone}`,
                template_id: MSG91Utilities._msg91.templateId,
                authkey: MSG91Utilities._msg91.authKey,
                otp,
                otp_expiry: MSG91Utilities._otp.expireOn,
            },
            method: 'GET',
        };

        return await Axios(axiosConfig)
            .then((res) => {
                // console.log(res.data);
                const { type } = res.data;
                return type === 'success';
            })
            .catch((e) => {
                // console.error(e);
                return false;
            });
    }

    /**
     * Verify OTP through MSG91.
     *
     * @param otp - OTP to be sent.
     * @param phone - Phone number to which the OTP had sent.
     * @param countryCode - Country code to be attached with phone number to verify OTP.
     *
     * @returns True or False based upon the response from MSG91
     */
    static async verifyOTP(otp: string, phone: string, countryCode: string): Promise<boolean> {
        const axiosConfig: AxiosRequestConfig = {
            url: MSG91Utilities._msg91.verifyOTPUrl,
            params: {
                mobile: `${countryCode}${phone}`,
                authkey: MSG91Utilities._msg91.authKey,
                otp,
            },
            method: 'GET',
        };

        return await Axios(axiosConfig)
            .then((res) => {
                // console.log(res.data);
                const { type } = res.data;
                return type === 'success';
            })
            .catch((e) => {
                // console.error(e);
                return false;
            });
    }

    /**
     * Send Message through MSG91.
     *
     * @param flowKey - The flow name based upon which the message has to be sent.
     * @param recipients - Phone number and other fields to which the message will be sent.
     *
     */
    static async sendMessage(flowKey: string, recipients: Array<any>): Promise<void> {
        if (!Object.values(FlowType).includes(flowKey as FlowType)) {
            return;
        }
        const axiosConfig: AxiosRequestConfig = {
            url: MSG91Utilities._msg91.flowUrl,
            method: 'POST',
            data: {
                flow_id: MSG91Utilities._msg91.flow[`${flowKey as FlowType}`],
                sender: MSG91Utilities._msg91.sender,
                recipients,
            },
            headers: {
                authkey: MSG91Utilities._msg91.authKey,
                'content-type': 'application/json',
            },
        };

        await Axios(axiosConfig)
            .then((res) => {
                // console.log(res.data);
            })
            .catch((e) => {
                // console.error(e);
            });
    }
}
