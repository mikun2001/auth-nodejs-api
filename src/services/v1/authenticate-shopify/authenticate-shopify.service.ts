// Initializes the `../auth/services/v1/authenticate-shopify` service on path `/v1/authenticate-shopify`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { AuthenticateShopify } from './authenticate-shopify.class';
import hooks from './authenticate-shopify.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/authenticate-shopify': AuthenticateShopify & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/authenticate-shopify', new AuthenticateShopify(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/authenticate-shopify');

    service.hooks(hooks);
}
