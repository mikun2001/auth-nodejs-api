// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import Objection, { JSONSchema, Model, RelationMappings } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../../declarations';
import { AuthCredentialStatusType } from './intefaces/AuthCredentialInterface';
import { AuthEntity } from '../auth-entity/auth-entity.model';

export class AuthCredential extends Model {
    createdAt!: Date;
    updatedAt!: Date;

    static get tableName(): string {
        return 'auth_credential';
    }

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['name', 'entityId'],

            properties: {
                name: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
                entityId: {
                    type: 'number',
                },
                password: {
                    type: 'string',
                },
                deviceId: {
                    type: ['string', 'null'],
                },
                phone: {
                    type: 'string',
                },
                status: {
                    type: 'number',
                    enum: [
                        AuthCredentialStatusType.ACTIVE, // 1
                        AuthCredentialStatusType.DELETED, // -1
                    ],
                    default: AuthCredentialStatusType.ACTIVE,
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
        if (AuthCredential.jsonSchema.properties) {
            [...Object.keys(AuthCredential.jsonSchema.properties), 'createdAt', 'updatedAt'].forEach((e) => {
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
                    from: 'auth_credential.entityId',
                    to: 'auth_entity.id',
                },
            },
        };
    }
}

export default function (app: Application): typeof AuthCredential {
    const db: Knex = app.get('knex');

    db.schema
        .hasTable('auth_credential')
        .then((exists) => {
            if (!exists) {
                db.schema
                    .createTable('auth_credential', (table) => {
                        table.increments('id');
                        table.string('name');
                        table.string('email');
                        table.integer('entityId');
                        table.string('password');
                        table.string('deviceId');
                        table.string('phone');
                        table.integer('status');
                        table.timestamp('createdAt', { useTz: true }).defaultTo(db.fn.now());
                        table.timestamp('updatedAt', { useTz: true }).defaultTo(db.fn.now());
                    })
                    .then(() => console.log('Created auth_credential table')) // eslint-disable-line no-console
                    .catch((e) => console.error('Error creating auth_credential table', e)); // eslint-disable-line no-console
            }
        })
        .catch((e) => console.error('Error creating auth_credential table', e)); // eslint-disable-line no-console

    return AuthCredential;
}
