// Initializes the `../auth/services/v1/authenticate-phone` service on path `/v1/authenticate-phone`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { AuthenticatePhone } from './authenticate-phone.class';
import hooks from './authenticate-phone.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/authenticate-phone': AuthenticatePhone & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/authenticate-phone', new AuthenticatePhone(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/authenticate-phone');

    service.hooks(hooks);
}
