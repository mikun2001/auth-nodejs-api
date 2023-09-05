import { HooksObject } from '@feathersjs/feathers';
import HandleEmailPasswordLogin from './hooks/HandleEmailPasswordLogin';
import FRequired from '../../../hooks/FRequired';
import CreateSessionHook from '../../../hooks/CreateSessionHook';
import SetDefaultItem from '../../../hooks/SetDefaultItem';
import { AuthServiceType } from '../../../utils/AuthHelper/AuthHelperInterface';
import SetConfigHook from '../../../hooks/SetConfigHook';
import ValidateEntityDataHook from '../../../hooks/ValidateEntityDataHook';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            FRequired(['entity', 'email', 'password', 'deviceId', 'deviceType', 'ip']),
            SetDefaultItem('authService', AuthServiceType.emailPassword),
            ValidateEntityDataHook(),
            SetConfigHook(),
            HandleEmailPasswordLogin(),
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
