import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { EmailPasswordLoginResult } from '../../../public_methods/interfaces/PublicMethodInterfaces';

interface Data {}

interface ServiceOptions {}

export class AuthenticateEmailPassword implements ServiceMethods<Data> {
    app: Application;
    options: ServiceOptions;

    constructor(options: ServiceOptions = {}, app: Application) {
        this.options = options;
        this.app = app;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async find(params?: Params): Promise<Data[] | Paginated<Data>> {
        return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async get(id: Id, params?: Params): Promise<Data> {
        return {
            id,
            text: `A new message with ID: ${id}!`,
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async create(data: Data, params?: Params): Promise<EmailPasswordLoginResult | any> {
        if (Array.isArray(data)) {
            return Promise.all(data.map((current) => this.create(current, params)));
        }

        return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
        return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
        return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async remove(id: NullableId, params?: Params): Promise<Data> {
        return { id };
    }
}
