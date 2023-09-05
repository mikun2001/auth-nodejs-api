import { HooksObject } from '@feathersjs/feathers';
import GetAccessTokenForSocialLogin from '../../../hooks/GetAccessTokenForSocialLogin';
import FRequired from '../../../hooks/FRequired';
import SetDefaultItem from '../../../hooks/SetDefaultItem';
import { AuthServiceType } from '../../../utils/AuthHelper/AuthHelperInterface';
import ValidateEntityDataHook from '../../../hooks/ValidateEntityDataHook';
import SetConfigHook from '../../../hooks/SetConfigHook';
import CheckCredentialHook from '../../../hooks/CheckCredentialHook';
import CreateSessionHook from '../../../hooks/CreateSessionHook';
import HandleShopifyLogin from './hooks/HandleShopifyLogin';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            FRequired(['code', 'storeName', 'entity', 'deviceType', 'deviceId', 'ip']),
            SetDefaultItem('authService', AuthServiceType.shopify),
            ValidateEntityDataHook(),
            SetConfigHook(),
            GetAccessTokenForSocialLogin(),
            HandleShopifyLogin(),
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
