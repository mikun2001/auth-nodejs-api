/**
 * Configuration for MSG91 interface.
 * @remarks
 * Under the flow object in interface add more fields
 * according to your requirements.
 */
export interface MSG91Config {
    authKey: string; // Auth Key for MSG91
    sendOTPUrl: string; // Url for requesting the Send OTP
    verifyOTPUrl: string; // Url for verifying the OTP
    flowUrl: string; // URL for using the flow API.
    sender: string; // The authorized sender (Ex- "SMRTZM")
    templateId: string; // Template id of the OTP from msg91
    flow: {
        /**
         * If using ONE API of msg91 declare the fields here with their ObjectId from msg91.
         */
        unconfirmedOrderSuccessful: string;
        unconfirmedOrderProcessed: string;
    };
}

export enum FlowType {
    UNCONFIRMED_ORDER_SUCCESSFUL = 'unconfirmedOrderSuccessful',
    UNCONFIRMED_ORDER_PROCESSED = 'unconfirmedOrderProcessed',
}

export interface OTPConfig {
    length: number;
    expireOn: number;
    viewLog: boolean;
}
