// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import Objection, { JSONSchema, Model, RelationMappings } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../../declarations';
import { AuthOtpActions, AuthOtpStatusType } from './interfaces/AuthOtpInterface';

export class AuthOtp extends Model {
    createdAt!: string;
    updatedAt!: string;

    static get tableName(): string {
        return 'auth_otp';
    }

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['otp', 'purpose'],

            properties: {
                email: {
                    type: 'string',
                },
                phone: {
                    type: 'string',
                },
                otp: {
                    type: 'string',
                },
                expireOn: {
                    type: 'string',
                },
                token: {
                    type: 'string',
                },
                purpose: {
                    type: 'string',
                    enum: [
                        AuthOtpActions.SIGNUP, // login
                        AuthOtpActions.LOGIN, // signup
                        AuthOtpActions.FORGOT_PASSWORD, // forgot_password
                    ],
                },
                status: {
                    type: 'number',
                    enum: [
                        AuthOtpStatusType.ACTIVE, // 1
                        AuthOtpStatusType.DELETED, //-1
                    ],
                    default: AuthOtpStatusType.ACTIVE,
                },
            },
        };
    }

    $beforeInsert(): void {
        this.createdAt = this.updatedAt = new Date().toISOString();
    }

    $beforeUpdate(): void {
        this.updatedAt = new Date().toISOString();
    }
    $formatDatabaseJson(json: Objection.Pojo): Objection.Pojo {
        if (json.expireOn) {
            json.expireOn = new Date(json.expireOn);
        }
        const finalObject: Objection.Pojo = {};
        if (AuthOtp.jsonSchema.properties) {
            Object.keys(AuthOtp.jsonSchema.properties).forEach((e) => {
                finalObject[e] = json[e];
            });
        }
        return super.$formatDatabaseJson(finalObject);
    }

    static get relationMappings(): RelationMappings {
        return {};
    }
}

export default function (app: Application): typeof AuthOtp {
    const db: Knex = app.get('knex');

    db.schema
        .hasTable('auth_otp')
        .then((exists) => {
            if (!exists) {
                db.schema
                    .createTable('auth_otp', (table) => {
                        table.increments('id');
                        table.string('email');
                        table.string('phone');
                        table.string('otp');
                        table.dateTime('expireOn', { useTz: true });
                        table.text('token');
                        table.string('purpose');
                        table.integer('status');
                        table.timestamp('createdAt', { useTz: true }).defaultTo(db.fn.now());
                        table.timestamp('updatedAt', { useTz: true }).defaultTo(db.fn.now());
                    })
                    .then(() => console.log('Created auth_otp table')) // eslint-disable-line no-console
                    .catch((e) => console.error('Error creating auth_otp table', e)); // eslint-disable-line no-console
            }
        })
        .catch((e) => console.error('Error creating auth_otp table', e)); // eslint-disable-line no-console

    return AuthOtp;
}
