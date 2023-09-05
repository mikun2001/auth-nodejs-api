import { HooksObject } from '@feathersjs/feathers';
import ChangeSessionDataForLogout from './hooks/ChangeSessionDataForLogout';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [ChangeSessionDataForLogout()],
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
