import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import hashPassword from '@feathersjs/authentication-local/lib/hooks/hash-password';
import ValidateEntityDataHook from '../../../hooks/ValidateEntityDataHook';
import CreateCredentialHook from './hooks/CreateCredentialHook';
import ValidateEmailPhone from './hooks/ValidateEmailPhone';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            FRequired(['entity']),
            hashPassword('password'),
            ValidateEntityDataHook(),
            ValidateEmailPhone(),
            CreateCredentialHook(),
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
