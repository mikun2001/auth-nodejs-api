// Initializes the `../auth/services/v1/authenticate-phone-password` service on path `/v1/authenticate-phone-password`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { AuthenticatePhonePassword } from './authenticate-phone-password.class';
import hooks from './authenticate-phone-password.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/authenticate-phone-password': AuthenticatePhonePassword & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/authenticate-phone-password', new AuthenticatePhonePassword(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/authenticate-phone-password');

    service.hooks(hooks);
}
