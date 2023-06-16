import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import ValidateAuthEntityData from './hooks/ValidateAuthEntityData';
import { disallow } from 'feathers-hooks-common';

export default {
    before: {
        all: [],
        find: [],
        get: [disallow()],
        create: [FRequired(['name', 'metaName']), ValidateAuthEntityData()],
        update: [disallow()],
        patch: [],
        remove: [disallow()],
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
