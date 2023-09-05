// Initializes the `../auth/services/v1/authenticate-jwt` service on path `/v1/authenticate-jwt`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { AuthenticateJwt } from './authenticate-jwt.class';
import hooks from './authenticate-jwt.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/authenticate-jwt': AuthenticateJwt & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/authenticate-jwt', new AuthenticateJwt(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/authenticate-jwt');

    service.hooks(hooks);
}
