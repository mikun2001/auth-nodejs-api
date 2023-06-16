// Initializes the `../auth/db_services/v1/auth-entity` service on path `/v1/auth-entity`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { AuthEntity } from './auth-entity.class';
import createModel from './auth-entity.model';
import hooks from './auth-entity.hooks';
import OnEntityDeleteCredentials from './events/OnEntityDeleteCredentials';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/auth-entity': AuthEntity & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/auth-entity', new AuthEntity(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/auth-entity');

    service.hooks(hooks);
    service.on('patched', OnEntityDeleteCredentials);
}
