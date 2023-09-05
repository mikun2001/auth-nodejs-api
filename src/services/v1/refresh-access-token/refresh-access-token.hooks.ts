import { HooksObject } from '@feathersjs/feathers';
import CreateSessionHook from '../../../hooks/CreateSessionHook';
import RefreshTokenHook from './hooks/RefreshTokenHook';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [RefreshTokenHook(), CreateSessionHook()],
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
