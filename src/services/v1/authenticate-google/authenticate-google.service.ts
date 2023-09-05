// Initializes the `../auth/services/v1/authenticate-google` service on path `/v1/authenticate-google`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { AuthenticateGoogle } from './authenticate-google.class';
import hooks from './authenticate-google.hooks';
import { NextFunction, Request, Response } from 'express';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/authenticate-google': AuthenticateGoogle & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use(
        '/v1/authenticate-google',
        function (req: Request, res: Response, next: NextFunction) {
            req.body.ip = req.header('x-forwarded-for') || req.ip;
            next();
        },
        new AuthenticateGoogle(options, app),
    );

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/authenticate-google');

    service.hooks(hooks);
}
