import { HooksObject } from '@feathersjs/feathers';
import hashPassword from '@feathersjs/authentication-local/lib/hooks/hash-password';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [hashPassword('password')],
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
