import { Application } from '../../../declarations';

import authConfig from './auth-config/auth-config.service';
import authEntity from './auth-entity/auth-entity.service';
import authSession from './auth-session/auth-session.service';
import authCredential from './auth-credential/auth-credential.service';
import authOtp from './auth-otp/auth-otp.service';

// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(authConfig);
    app.configure(authEntity);
    app.configure(authSession);
    app.configure(authCredential);
    app.configure(authOtp);
}
