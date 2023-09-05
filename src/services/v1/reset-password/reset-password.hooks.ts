import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import ResetPasswordHook from './hooks/ResetPasswordHook';
import ModifyAccessToken from '../../../hooks/ModifyAccessToken';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [FRequired(['password']), ModifyAccessToken(), ResetPasswordHook()],
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
