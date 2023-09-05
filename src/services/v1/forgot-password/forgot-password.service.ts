// Initializes the `../auth/services/v1/forgot-password` service on path `/v1/forgot-password`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { ForgotPassword } from './forgot-password.class';
import hooks from './forgot-password.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/forgot-password': ForgotPassword & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/forgot-password', new ForgotPassword(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/forgot-password');

    service.hooks(hooks);
}
