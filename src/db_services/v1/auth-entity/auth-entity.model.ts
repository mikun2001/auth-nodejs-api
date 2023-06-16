// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import Objection, { Model, JSONSchema, RelationMappings } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../../declarations';
import { AuthEntityStatusType } from './intefaces/AuthEntityInterface';

export class AuthEntity extends Model {
    createdAt!: Date;
    updatedAt!: Date;

    static get tableName(): string {
        return 'auth_entity';
    }

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['name', 'metaName'],

            properties: {
                name: {
                    type: 'string',
                },
                metaName: {
                    type: 'string',
                },
                status: {
                    type: 'number',
                    enum: [
                        AuthEntityStatusType.ACTIVE, // 1
                        AuthEntityStatusType.DELETED, // -1
                    ],
                    default: AuthEntityStatusType.ACTIVE,
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
        if (AuthEntity.jsonSchema.properties) {
            [...Object.keys(AuthEntity.jsonSchema.properties), 'createdAt', 'updatedAt'].forEach((e) => {
                if (typeof json[e] !== 'undefined') {
                    finalObject[e] = json[e];
                }
            });
        }
        return super.$formatDatabaseJson(finalObject);
    }
    static get relationMappings(): RelationMappings {
        return {};
    }
}

export default function (app: Application): typeof AuthEntity {
    const db: Knex = app.get('knex');

    db.schema
        .hasTable('auth_entity')
        .then((exists) => {
            if (!exists) {
                db.schema
                    .createTable('auth_entity', (table) => {
                        table.increments('id');
                        table.string('name');
                        table.string('metaName');
                        table.integer('status');
                        table.timestamp('createdAt', { useTz: true }).defaultTo(db.fn.now());
                        table.timestamp('updatedAt', { useTz: true }).defaultTo(db.fn.now());
                    })
                    .then(() => console.log('Created auth_entity table')) // eslint-disable-line no-console
                    .catch((e) => console.error('Error creating auth_entity table', e)); // eslint-disable-line no-console
            }
        })
        .catch((e) => console.error('Error creating auth_entity table', e)); // eslint-disable-line no-console

    return AuthEntity;
}
