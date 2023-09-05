import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import ValidateEntityDataHook from '../../../hooks/ValidateEntityDataHook';
import CredentialForGuestHook from './hooks/CredentialForGuestHook';
import CreateSessionHook from '../../../hooks/CreateSessionHook';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [
            FRequired(['name', 'entity', 'deviceId']),
            ValidateEntityDataHook(),
            CredentialForGuestHook(),
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
