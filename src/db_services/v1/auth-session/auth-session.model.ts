// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import Objection, { Model, JSONSchema, RelationMappings } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../../declarations';
import { AuthSessionDeviceType, AuthSessionStatusType } from './intefaces/AuthSessionInterface';
import { AuthCredential } from '../auth-credential/auth-credential.model';

export class AuthSession extends Model {
    createdAt!: Date;
    updatedAt!: Date;

    static get tableName(): string {
        return 'auth_session';
    }

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['credentialId', 'deviceId', 'deviceType', 'accessToken', 'ip'],

            properties: {
                credentialId: {
                    type: 'integer',
                },
                fcmId: {
                    type: 'string',
                },
                deviceId: {
                    type: 'string',
                },
                deviceType: {
                    type: 'integer',
                    enum: [
                        AuthSessionDeviceType.WEB, // 1,
                        AuthSessionDeviceType.ANDROID, // 2,
                        AuthSessionDeviceType.IOS, // 3,
                    ],
                },
                accessToken: {
                    type: 'string',
                },
                ip: {
                    type: 'string',
                },
                endedOn: {
                    type: 'string',
                },
                status: {
                    type: 'number',
                    enum: [
                        AuthSessionStatusType.ACTIVE, // 1
                        AuthSessionStatusType.DELETED, // -1
                    ],
                    default: AuthSessionStatusType.ACTIVE,
                },
            },
        };
    }

    $beforeInsert(): void {
        this.createdAt = this.updatedAt = new Date();
    }

    $beforeUpdate(): void {
        this.updatedAt = new Date();
    }
    $formatDatabaseJson(json: Objection.Pojo): Objection.Pojo {
        if (json.endedOn) {
            json.endedOn = new Date(json.endedOn);
        }
        const finalObject: Objection.Pojo = {};
        if (AuthSession.jsonSchema.properties) {
            Object.keys(AuthSession.jsonSchema.properties).forEach((e) => {
                finalObject[e] = json[e];
            });
        }
        return super.$formatDatabaseJson(finalObject);
    }

    static get relationMappings(): RelationMappings {
        return {
            credential: {
                relation: Model.HasOneRelation,
                modelClass: AuthCredential,
                join: {
                    from: 'auth_session.credentialId',
                    to: 'auth_credential.id',
                },
            },
        };
    }
}

export default function (app: Application): typeof AuthSession {
    const db: Knex = app.get('knex');

    db.schema
        .hasTable('auth_session')
        .then((exists) => {
            if (!exists) {
                db.schema
                    .createTable('auth_session', (table) => {
                        table.increments('id');
                        table.integer('credentialId');
                        table.string('fcmId');
                        table.string('deviceId');
                        table.integer('deviceType');
                        table.text('accessToken');
                        table.string('ip');
                        table.dateTime('endedOn', { useTz: true });
                        table.integer('status');
                        table.timestamp('createdAt', { useTz: true }).defaultTo(db.fn.now());
                        table.timestamp('updatedAt', { useTz: true }).defaultTo(db.fn.now());
                    })
                    .then(() => console.log('Created auth_session table')) // eslint-disable-line no-console
                    .catch((e) => console.error('Error creating auth_session table', e)); // eslint-disable-line no-console
            }
        })
        .catch((e) => console.error('Error creating auth_session table', e)); // eslint-disable-line no-console

    return AuthSession;
}
