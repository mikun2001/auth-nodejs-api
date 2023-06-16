import { Application } from '../declarations';
import db_services from '../db_services';
import utils from '../public_methods/utils'
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  // Set up our db services of auth.
  app.configure(db_services);
  app.configure(utils);
  app.configure(AuthService.initialize);

  // Set up our services of auth (see `services/index.ts`)
}
