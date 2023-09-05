import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import SetDefaultItem from '../../../hooks/SetDefaultItem';
import { AuthServiceType } from '../../../utils/AuthHelper/AuthHelperInterface';
import SetConfigHook from '../../../hooks/SetConfigHook';
import CreateSessionHook from '../../../hooks/CreateSessionHook';
import HandlePhonePasswordLogin from './hooks/HandlePhonePasswordLogin';
import ValidateEntityDataHook from '../../../hooks/ValidateEntityDataHook';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            FRequired(['entity', 'phone', 'password', 'deviceId', 'deviceType', 'ip']),
            SetDefaultItem('authService', AuthServiceType.phonePassword),
            ValidateEntityDataHook(),
            SetConfigHook(),
            HandlePhonePasswordLogin(),
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
