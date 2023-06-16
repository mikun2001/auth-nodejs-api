// Initializes the `../auth/db_services/v1/auth-config` service on path `/v1/auth-config`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { AuthConfig } from './auth-config.class';
import createModel from './auth-config.model';
import hooks from './auth-config.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/auth-config': AuthConfig & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/auth-config', new AuthConfig(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/auth-config');

    service.hooks(hooks);
}
