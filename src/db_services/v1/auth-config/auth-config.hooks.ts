import { HooksObject } from '@feathersjs/feathers';
import PatchDeleted from '../../../../hooks/PatchDeleted';
import { disallow } from 'feathers-hooks-common';
import ValidateAuthConfigData from './hooks/ValidateAuthConfigData';
import FRequired from '../../../hooks/FRequired';

export default {
    before: {
        all: [],
        find: [],
        get: [disallow()],
        create: [FRequired(['strategies', 'entity']), ValidateAuthConfigData()],
        update: [disallow()],
        patch: [],
        remove: [PatchDeleted()],
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
