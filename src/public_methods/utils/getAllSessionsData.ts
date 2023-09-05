/**
 * Created By Abhilash Dash(abhilashdash2023@gmail.com) on 16-03-2023 at 15:53.
 */

import {
  AuthSession_FIND,
  AuthSession_GET,
  AuthSession_QUERY,
  AuthSessionDeviceType,
  AuthSessionStatusType,
} from "../../db_services/v1/auth-session/intefaces/AuthSessionInterface";
import { authSessionPath } from "../../service_endpoints/services";
import { BadRequest, FeathersError } from "@feathersjs/errors";
import { Application } from "../../../declarations";
import { GetAllSessionInterface } from "../interfaces/PublicMethodInterfaces";
import { AuthHelper } from "../../utils/AuthHelper/AuthHelper";
import { Knex } from "knex";

export const getAllSessionsData = async (
  data: GetAllSessionInterface,
  app: Application
) => {
  const { guest, deviceId, fcmId, email, phone, credentialId } = data;
  let sessionData: Array<AuthSession_GET> | any;

  const query: AuthSession_QUERY = {
    endedOn: null,
    status: AuthSessionStatusType.ACTIVE,
  };

  if (!guest) {
    if (deviceId) {
      query.deviceId = deviceId;
    } else if (fcmId) {
      query.fcmId = fcmId;
    } else if (credentialId) {
      query.credentialId = parseInt(credentialId);
    } else if (email) {
      const credentialData = await AuthHelper.checkAuthCredentialEmail(
        email,
        {}
      );
      if (credentialData) {
        query.credentialId = credentialData.id;
      } else {
        throw new BadRequest("Invalid email.");
      }
    } else if (phone) {
      const credentialData = await AuthHelper.checkAuthCredentialPhone(
        phone,
        {}
      );
      if (credentialData) {
        query.credentialId = credentialData.id;
      } else {
        throw new BadRequest("Invalid phone no.");
      }
    }
    sessionData = await app
      .service(authSessionPath)
      ._find({
        query,
      })
      .then((res: AuthSession_FIND): Array<AuthSession_GET> | null =>
        res.total > 0 ? res.data : null
      )
      .catch((err: FeathersError) => {
        throw new BadRequest(err);
      });
  } else {
    const sqlQuery =
      "SELECT auth_session.id, credentialId, fcmId, auth_session.deviceId, deviceType, accessToken, ip, endedOn, auth_session.status FROM auth_session JOIN auth_credential ON auth_session.credentialId=auth_credential.id AND auth_credential.status = 1 AND auth_session.status = 1 AND auth_session.deviceId = auth_credential.deviceId";

    const knex: Knex = app.get("knex");
    sessionData = await knex.raw(sqlQuery).then((res) => res[0]);
  }

  if (sessionData) {
    return sessionData.map((each: AuthSession_GET) => {
      return {
        id: each.id,
        deviceId: each.deviceId,
        fcmId: each.fcmId,
        ip: each.ip,
        deviceType: AuthSessionDeviceType[each.deviceType],
      };
    });
  }
  return sessionData;
};
