import AuthenticateAccessToken from './hooks/AuthenticateAccessToken';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [AuthenticateAccessToken()],
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
