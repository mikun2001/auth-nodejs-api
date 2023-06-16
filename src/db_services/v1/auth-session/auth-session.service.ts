// Initializes the `../auth/db_services/v1/auth-session` service on path `/v1/auth-session`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { AuthSession } from './auth-session.class';
import createModel from './auth-session.model';
import hooks from './auth-session.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/auth-session': AuthSession & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/auth-session', new AuthSession(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/auth-session');

    service.hooks(hooks);
}
