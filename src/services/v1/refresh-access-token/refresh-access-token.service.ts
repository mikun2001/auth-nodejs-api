// Initializes the `../auth/services/v1/refresh-access-token` service on path `/v1/refresh-access-token`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { RefreshAccessToken } from './refresh-access-token.class';
import hooks from './refresh-access-token.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/refresh-access-token': RefreshAccessToken & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/refresh-access-token', new RefreshAccessToken(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/refresh-access-token');

    service.hooks(hooks);
}
