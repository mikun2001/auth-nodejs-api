// Initializes the `../auth/services/v1/change-password` service on path `/v1/change-password`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { ChangePassword } from './change-password.class';
import hooks from './change-password.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/change-password': ChangePassword & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/change-password', new ChangePassword(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/change-password');

    service.hooks(hooks);
}
