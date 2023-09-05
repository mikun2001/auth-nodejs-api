import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import SetDefaultItem from '../../../hooks/SetDefaultItem';
import { AuthServiceType } from '../../../utils/AuthHelper/AuthHelperInterface';
import ValidateEntityDataHook from '../../../hooks/ValidateEntityDataHook';
import CheckCredentialHook from '../../../hooks/CheckCredentialHook';
import CreateSessionHook from '../../../hooks/CreateSessionHook';
import HandleFacebookLogin from './hooks/HandleFacebookLogin';
import SetConfigHook from '../../../hooks/SetConfigHook';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            FRequired(['accessToken', 'entity', 'ip', 'deviceType', 'deviceId']),
            SetDefaultItem('authService', AuthServiceType.facebook),
            ValidateEntityDataHook(),
            SetConfigHook(),
            HandleFacebookLogin(),
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
