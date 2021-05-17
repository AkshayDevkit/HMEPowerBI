import buildQuery from 'odata-query';
import { Api } from '@components/base/api/base.api';
import { BaseService, IService } from '@components/base/services';
import { LoggedInUser, User } from './types';

export class UserService extends BaseService<User> implements IService<User> {
    constructor() {
        super('User', 'user');
    }

    getByUserId = async (userId: string): Promise<User | null> => {
        const queryOptions = {
            filter: {
                userId: userId,
            },
            top: 1,
        };
        const query = buildQuery(queryOptions);
        const response = await Api.get<User[]>(`${this.routePath}${query}`);
        return response.data.length ? response.data[0] : null;
    };

    logIn = async (userId: string, password: string): Promise<LoggedInUser> => {
        return (
            await Api.post<LoggedInUser>(`${this.routePath}/login`, {
                userId: userId,
                password: password,
            })
        ).data;
    };

    updateTheme = async (id: string, theme: string): Promise<void> => {
        await Api.put(`${this.routePath}/update-theme/${id}/${theme}`);
    };
}
