// Initializes the `../auth/services/v1/reset-password` service on path `/v1/reset-password`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { ResetPassword } from './reset-password.class';
import hooks from './reset-password.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/reset-password': ResetPassword & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/reset-password', new ResetPassword(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/reset-password');

    service.hooks(hooks);
}
