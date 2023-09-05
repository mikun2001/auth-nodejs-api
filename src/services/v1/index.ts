import { Application } from '../../../declarations';
import authenticateGoogle from './authenticate-google/authenticate-google.service';
import authenticateEmail from './authenticate-email/authenticate-email.service';
import authenticateFacebook from './authenticate-facebook/authenticate-facebook.service';
import authenticateTrueCaller from './authenticate-truecaller/authenticate-truecaller.service';
import authenticateDiscord from './authenticate-discord/authenticate-discord.service';
import authenticateEmailPassword from './authenticate-email-password/authenticate-email-password.service';
import changePassword from './change-password/change-password.service';
import createCredential from './create-credential/create-credential.service';
import authenticateApple from './authenticate-apple/authenticate-apple.service';
import authenticatePhone from './authenticate-phone/authenticate-phone.service';
import authenticatePhonePassword from './authenticate-phone-password/authenticate-phone-password.service';
import authenticateLinkedin from './authenticate-linkedin/authenticate-linkedin.service';
import deleteCredential from './delete-credential/delete-credential.service';
import authenticateGuest from './authenticate-guest/authenticate-guest.service';
import authenticateJwt from './authenticate-jwt/authenticate-jwt.service';
import forgotPassword from './forgot-password/forgot-password.service';
import resetPassword from './reset-password/reset-password.service';
import logout from './logout/logout.service';
import refreshAccessToken from './refresh-access-token/refresh-access-token.service';
import authenticateShopify from './authenticate-shopify/authenticate-shopify.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(authenticateGoogle);
    app.configure(authenticateEmail);
    app.configure(authenticateFacebook);
    app.configure(authenticateTrueCaller);
    app.configure(authenticateDiscord);
    app.configure(authenticateEmailPassword);
    app.configure(changePassword);
    app.configure(createCredential);
    app.configure(authenticateApple);
    app.configure(authenticatePhone);
    app.configure(authenticatePhonePassword);
    app.configure(authenticateLinkedin);
    app.configure(deleteCredential);
    app.configure(authenticateGuest);
    app.configure(authenticateJwt);
    app.configure(forgotPassword);
    app.configure(resetPassword);
    app.configure(logout);
    app.configure(refreshAccessToken);
    app.configure(authenticateShopify);
}
