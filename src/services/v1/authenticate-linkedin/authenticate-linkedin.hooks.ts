import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import SetDefaultItem from '../../../hooks/SetDefaultItem';
import { AuthServiceType } from '../../../utils/AuthHelper/AuthHelperInterface';
import ValidateEntityDataHook from '../../../hooks/ValidateEntityDataHook';
import SetConfigHook from '../../../hooks/SetConfigHook';
import CheckCredentialHook from '../../../hooks/CheckCredentialHook';
import CreateSessionHook from '../../../hooks/CreateSessionHook';
import HandleLinkedInLogin from './hooks/HandleLinkedInLogin';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            FRequired(['accessToken', 'entity', 'deviceType', 'deviceId', 'ip']),
            SetDefaultItem('authService', AuthServiceType.linkedIn),
            ValidateEntityDataHook(),
            SetConfigHook(),
            HandleLinkedInLogin(),
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
