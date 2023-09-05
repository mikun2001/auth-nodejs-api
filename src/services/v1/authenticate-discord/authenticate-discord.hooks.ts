import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import SetDefaultItem from '../../../hooks/SetDefaultItem';
import { AuthServiceType } from '../../../utils/AuthHelper/AuthHelperInterface';
import ValidateEntityDataHook from '../../../hooks/ValidateEntityDataHook';
import CheckCredentialHook from '../../../hooks/CheckCredentialHook';
import CreateSessionHook from '../../../hooks/CreateSessionHook';
import HandleDiscordLogin from './hooks/HandleDiscordLogin';
import SetConfigHook from '../../../hooks/SetConfigHook';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            FRequired(['accessToken', 'entity', 'deviceType', 'deviceId', 'ip']),
            SetDefaultItem('authService', AuthServiceType.discord),
            ValidateEntityDataHook(),
            SetConfigHook(),
            HandleDiscordLogin(),
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
