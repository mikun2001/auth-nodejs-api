import { HooksObject } from '@feathersjs/feathers';
import CreateAccessToken from './hooks/CreateAccessToken';
import DeletePreviousSessions from './hooks/DeletePreviousSessions';
import ModifyAccessToken from '../../../hooks/ModifyAccessToken';

export default {
    before: {
        all: [],
        find: [ModifyAccessToken()],
        get: [ModifyAccessToken()],
        create: [CreateAccessToken(), DeletePreviousSessions(), ModifyAccessToken()],
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
