import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import SendOTP from './hooks/SendOTP';
import ValidateEmailPhone from './hooks/ValidateEmailPhone';
import VerifyOTP from './hooks/VerifyOTP';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [FRequired(['purpose']), ValidateEmailPhone(), SendOTP()],
        update: [],
        patch: [FRequired(['purpose', 'otp']), ValidateEmailPhone(), VerifyOTP()],
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
