// Initializes the `../auth/services/v1/authenticate-linkedin` service on path `/v1/authenticate-linkedin`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { AuthenticateLinkedin } from './authenticate-linkedin.class';
import hooks from './authenticate-linkedin.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/authenticate-linkedin': AuthenticateLinkedin & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/authenticate-linkedin', new AuthenticateLinkedin(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/authenticate-linkedin');

    service.hooks(hooks);
}
