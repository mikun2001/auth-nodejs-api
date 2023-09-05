// Initializes the `../auth/services/v1/authenticate-email-password` service on path `/v1/authenticate-email-password`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { AuthenticateEmailPassword } from './authenticate-email-password.class';
import hooks from './authenticate-email-password.hooks';
import { NextFunction, Request, Response } from 'express';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/authenticate-email-password': AuthenticateEmailPassword & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use(
        '/v1/authenticate-email-password',
        function (req: Request, res: Response, next: NextFunction) {
            req.body.ip = req.header('x-forwarded-for') || req.ip;
            next();
        },
        new AuthenticateEmailPassword(options, app),
    );

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/authenticate-email-password');

    service.hooks(hooks);
}
