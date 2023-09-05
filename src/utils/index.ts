import { Application } from '../../declarations';
import { AuthHelper } from './AuthHelper/AuthHelper';
import { MSG91Utilities } from './MSG91Utilities/MSG91Utilities';
import { OTPHelper } from './AuthHelper/OTPHelper';

// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(MSG91Utilities.initializeMSG91);
    app.configure(AuthHelper.initializeAuth);
    app.configure(OTPHelper.initializeOTP);
}
