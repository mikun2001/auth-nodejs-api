import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import SendOtpToEmail from './hooks/SendOtpToEmail';
import SetDefaultItem from '../../../hooks/SetDefaultItem';
import { AuthServiceType } from '../../../utils/AuthHelper/AuthHelperInterface';
import ValidateEntityDataHook from '../../../hooks/ValidateEntityDataHook';
import CheckCredentialHook from '../../../hooks/CheckCredentialHook';
import CreateSessionHook from '../../../hooks/CreateSessionHook';
import VerifyEmailOtpConfig from './hooks/VerifyEmailOtpConfig';
import VerifyEmailOtp from './hooks/VerifyEmailOtp';
import SetConfigHook from '../../../hooks/SetConfigHook';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            FRequired(['entity', 'email', 'purpose']),
            SetDefaultItem('authService', AuthServiceType.emailOtp),
            ValidateEntityDataHook(),
            SetConfigHook(),
            VerifyEmailOtpConfig(),
            SendOtpToEmail(),
        ],
        update: [],
        patch: [
            FRequired(['entity', 'otp', 'ip', 'deviceType', 'deviceId']),
            SetDefaultItem('authService', AuthServiceType.emailOtp),
            ValidateEntityDataHook(),
            SetConfigHook(),
            VerifyEmailOtpConfig(),
            VerifyEmailOtp(),
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
