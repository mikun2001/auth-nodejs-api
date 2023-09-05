import { HooksObject } from '@feathersjs/feathers';
import ChangePasswordHook from './hooks/ChangePasswordHook';
import FRequired from '../../../hooks/FRequired';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [FRequired(['oldPassword', 'newPassword']), ChangePasswordHook()],
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
