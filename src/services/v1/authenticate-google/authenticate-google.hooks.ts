import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import ValidateEntityDataHook from '../../../hooks/ValidateEntityDataHook';
import SetDefaultItem from '../../../hooks/SetDefaultItem';
import HandleGoogleLogin from './hooks/HandleGoogleLogin';
import { AuthServiceType } from '../../../utils/AuthHelper/AuthHelperInterface';
import CheckCredentialHook from '../../../hooks/CheckCredentialHook';
import CreateSessionHook from '../../../hooks/CreateSessionHook';
import SetConfigHook from '../../../hooks/SetConfigHook';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            FRequired(['accessToken', 'entity', 'deviceType', 'deviceId', 'ip']),
            SetDefaultItem('authService', AuthServiceType.google),
            ValidateEntityDataHook(),
            SetConfigHook(),
            HandleGoogleLogin(),
            CheckCredentialHook(),
            CreateSessionHook(),
        ],
        update: [],
        patch: [],
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
