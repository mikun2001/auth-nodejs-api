// Initializes the `../auth/db_services/v1/auth-otp` service on path `/v1/auth-otp`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { AuthOtp } from './auth-otp.class';
import createModel from './auth-otp.model';
import hooks from './auth-otp.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/auth-otp': AuthOtp & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/auth-otp', new AuthOtp(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/auth-otp');

    service.hooks(hooks);
}
