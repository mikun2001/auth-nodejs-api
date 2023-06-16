// Initializes the `../auth/db_services/v1/auth-credential` service on path `/v1/auth-credential`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { AuthCredential } from './auth-credential.class';
import createModel from './auth-credential.model';
import hooks from './auth-credential.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/auth-credential': AuthCredential & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/auth-credential', new AuthCredential(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/auth-credential');

    service.hooks(hooks);
}
