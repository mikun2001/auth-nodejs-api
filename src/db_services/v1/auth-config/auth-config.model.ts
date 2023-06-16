// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import Objection, { Model, JSONSchema, RelationMappings } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../../declarations';
import { AuthConfigStatusType } from './intefaces/AuthConfigInterfaces';
import { AuthEntity } from '../auth-entity/auth-entity.model';

class AuthConfig extends Model {
    createdAt!: Date;
    updatedAt!: Date;

    static get tableName(): string {
        return 'auth_config';
    }

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['strategies', 'entityId'],

            properties: {
                strategies: {
                    type: 'object',
                    properties: {
                        emailPassword: {
                            type: 'boolean',
                            default: false,
                        },
                        phonePassword: {
                            type: 'boolean',
                            default: false,
                        },
                        phoneOtp: {
                            type: 'boolean',
                            default: false,
                        },
                        emailOtp: {
                            type: 'boolean',
                            default: false,
                        },
                        google: {
                            type: 'boolean',
                            default: false,
                        },
                        facebook: {
                            type: 'boolean',
                            default: false,
                        },
                        linkedIn: {
                            type: 'boolean',
                            default: false,
                        },
                        discord: {
                            type: 'boolean',
                            default: false,
                        },
                        apple: {
                            type: 'boolean',
                            default: false,
                        },
                        trueCaller: {
                            type: 'boolean',
                            default: false,
                        },
                        guest: {
                            type: 'boolean',
                            default: false,
                        },
                        shopify: {
                            type: 'boolean',
                            default: false,
                        },
                    },
                },
                entityId: {
                    type: 'number',
                },
                mailConfig: {
                    type: 'object',
                    required: ['host', 'port', 'secure', 'auth', 'signUpEnabled'],
                    properties: {
                        host: {
                            type: 'string',
                        },
                        port: {
                            type: 'number',
                        },
                        secure: {
                            type: 'boolean',
                        },
                        auth: {
                            type: 'object',
                            properties: {
                                user: {
                                    type: 'string',
                                },
                                pass: {
                                    type: 'string',
                                },
                            },
                        },
                        signUpEnabled: {
                            type: 'boolean',
                        },
                    },
                },
                phoneConfig: {
                    type: 'object',
                    required: ['authKey', 'sendOtpUrl', 'verifyOtpUrl', 'sender', 'templateId', 'signUpEnabled'],
                    properties: {
                        authKey: {
                            type: 'string',
                        },
                        sendOtpUrl: {
                            type: 'string',
                        },
                        verifyOtpUrl: {
                            type: 'string',
                        },
                        sender: {
                            type: 'string',
                        },
                        templateId: {
                            type: 'string',
                        },
                        signUpEnabled: {
                            type: 'boolean',
                        },
                    },
                },
                googleConfig: {
                    type: 'object',
                    required: ['googleOauthUrl', 'clientId', 'clientSecret'],
                    properties: {
                        googleOauthUrl: {
                            type: 'string',
                        },
                        clientId: {
                            type: 'string',
                        },
                        clientSecret: {
                            type: 'string',
                        },
                    },
                },
                shopifyConfig: {
                    type: 'object',
                    required: ['clientId', 'clientSecret'],
                    properties: {
                        clientId: {
                            type: 'string',
                        },
                        clientSecret: {
                            type: 'string',
                        },
                    },
                },
                facebookConfig: {
                    type: 'object',
                    required: ['facebookOauthUrl', 'clientId', 'clientSecret'],
                    properties: {
                        facebookOauthUrl: {
                            type: 'string',
                        },
                        clientId: {
                            type: 'string',
                        },
                        clientSecret: {
                            type: 'string',
                        },
                    },
                },
                linkedInConfig: {
                    type: 'object',
                    required: ['linkedinEmailUrl', 'linkedinProfileUrl', 'clientId', 'clientSecret'],
                    properties: {
                        linkedinEmailUrl: {
                            type: 'string',
                        },
                        linkedinProfileUrl: {
                            type: 'string',
                        },
                        clientId: {
                            type: 'string',
                        },
                        clientSecret: {
                            type: 'string',
                        },
                    },
                },
                discordConfig: {
                    type: 'object',
                    required: ['discordOauthUrl', 'clientId', 'clientSecret'],
                    properties: {
                        discordOauthUrl: {
                            type: 'string',
                        },
                        clientId: {
                            type: 'string',
                        },
                        clientSecret: {
                            type: 'string',
                        },
                    },
                },
                trueCallerConfig: {
                    type: 'object',
                    required: ['trueCallerOauthUrl', 'clientId', 'clientSecret'],
                    properties: {
                        trueCallerOauthUrl: {
                            type: 'string',
                        },
                        clientId: {
                            type: 'string',
                        },
                        clientSecret: {
                            type: 'string',
                        },
                    },
                },
                appleConfig: {
                    type: 'object',
                    required: ['appleOauthUrl', 'appleIssuer', 'clientId', 'clientSecret'],
                    properties: {
                        appleOauthUrl: {
                            type: 'string',
                        },
                        appleIssuer: {
                            type: 'string',
                        },
                        clientId: {
                            type: 'string',
                        },
                        clientSecret: {
                            type: 'string',
                        },
                    },
                },
                otpConfig: {
                    type: 'object',
                    required: ['length', 'expireOn', 'viewLog'],
                    properties: {
                        length: {
                            type: 'number',
                        },
                        expireOn: {
                            type: 'number',
                        },
                        viewLog: {
                            type: 'boolean',
                        },
                    },
                },
                status: {
                    type: 'number',
                    enum: [
                        AuthConfigStatusType.ACTIVE, // 1
                        AuthConfigStatusType.DELETED, //-1
                    ],
                    default: AuthConfigStatusType.ACTIVE,
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
        const finalObject: Objection.Pojo = {};
        if (AuthConfig.jsonSchema.properties) {
            [...Object.keys(AuthConfig.jsonSchema.properties), 'createdAt', 'updatedAt'].forEach((e) => {
                if (typeof json[e] !== 'undefined') {
                    finalObject[e] = json[e];
                }
            });
        }
        return super.$formatDatabaseJson(finalObject);
    }
    static get relationMappings(): RelationMappings {
        return {
            entity: {
                relation: Model.HasOneRelation,
                modelClass: AuthEntity,
                join: {
                    from: 'auth_config.entityId',
                    to: 'auth_entity.id',
                },
            },
        };
    }
}

export default function (app: Application): typeof AuthConfig {
    const db: Knex = app.get('knex');

    db.schema
        .hasTable('auth_config')
        .then((exists) => {
            if (!exists) {
                db.schema
                    .createTable('auth_config', (table) => {
                        table.increments('id');
                        table.json('strategies');
                        table.integer('entityId');
                        table.json('mailConfig');
                        table.json('phoneConfig');
                        table.json('googleConfig');
                        table.json('facebookConfig');
                        table.json('linkedInConfig');
                        table.json('discordConfig');
                        table.json('shopifyConfig');
                        table.json('trueCallerConfig');
                        table.json('appleConfig');
                        table.json('otpConfig');
                        table.integer('status');
                        table.timestamp('createdAt', { useTz: true }).defaultTo(db.fn.now());
                        table.timestamp('updatedAt', { useTz: true }).defaultTo(db.fn.now());
                    })
                    .then(() => console.log('Created auth_config table')) // eslint-disable-line no-console
                    .catch((e) => console.error('Error creating auth_config table', e)); // eslint-disable-line no-console
            }
            // else {
            //     db.schema
            //         .alterTable('auth_config', (table) => {
            //             table.json('shopifyConfig');
            //         })
            //         .then(() => console.log('Altered auth_config table')) // eslint-disable-line no-console
            //         .catch((e) => console.error('Error creating auth_config table', e));
            // }
        })
        .catch((e) => console.error('Error creating auth_config table', e)); // eslint-disable-line no-console

    return AuthConfig;
}
