// Initializes the `../auth/services/v1/authenticate-truecaller` service on path `/v1/authenticate-truecaller`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { AuthenticateTruecaller } from './authenticate-truecaller.class';
import hooks from './authenticate-truecaller.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/authenticate-truecaller': AuthenticateTruecaller & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/authenticate-truecaller', new AuthenticateTruecaller(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/authenticate-truecaller');

    service.hooks(hooks);
}
