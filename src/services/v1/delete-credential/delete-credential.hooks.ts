import { HooksObject } from '@feathersjs/feathers';
import DeleteCredentialDataHook from './hooks/DeleteCredentialDataHook';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [DeleteCredentialDataHook()],
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
