// Initializes the `../auth/services/v1/create-credential` service on path `/v1/create-credential`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { CreateCredential } from './create-credential.class';
import hooks from './create-credential.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/create-credential': CreateCredential & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/create-credential', new CreateCredential(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/create-credential');

    service.hooks(hooks);
}
