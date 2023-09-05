import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import SetDefaultItem from '../../../hooks/SetDefaultItem';
import { AuthServiceType } from '../../../utils/AuthHelper/AuthHelperInterface';
import ValidateEntityDataHook from '../../../hooks/ValidateEntityDataHook';
import SetConfigHook from '../../../hooks/SetConfigHook';
import CheckCredentialHook from '../../../hooks/CheckCredentialHook';
import CreateSessionHook from '../../../hooks/CreateSessionHook';
import VerifyPhoneOtpConfig from './hooks/VerifyPhoneOtpConfig';
import SendOtpToPhone from './hooks/SendOtpToPhone';
import VerifyPhoneOtp from './hooks/VerifyPhoneOtp';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            FRequired(['entity', 'phone', 'purpose']),
            SetDefaultItem('authService', AuthServiceType.phoneOtp),
            ValidateEntityDataHook(),
            SetConfigHook(),
            VerifyPhoneOtpConfig(),
            SendOtpToPhone(),
        ],
        update: [],
        patch: [
            FRequired(['entity', 'ip', 'deviceType', 'deviceId']),
            SetDefaultItem('authService', AuthServiceType.phoneOtp),
            ValidateEntityDataHook(),
            SetConfigHook(),
            VerifyPhoneOtpConfig(),
            VerifyPhoneOtp(),
            CheckCredentialHook(),
            CreateSessionHook(),
        ],
        remove: [],
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
