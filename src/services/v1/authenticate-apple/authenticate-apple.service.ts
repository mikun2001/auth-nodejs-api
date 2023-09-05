// Initializes the `../auth/services/v1/authenticate-apple` service on path `/v1/authenticate-apple`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { AuthenticateApple } from './authenticate-apple.class';
import hooks from './authenticate-apple.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/authenticate-apple': AuthenticateApple & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/authenticate-apple', new AuthenticateApple(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/authenticate-apple');

    service.hooks(hooks);
}
