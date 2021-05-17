import { BaseModel } from '@components/base/models';

export class User extends BaseModel {
    userId: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    name?: string = '';
    pictureUrl?: string = '';
    address1?: string = '';
    address2?: string = '';
    city?: string = '';
    state?: string = '';
    country?: string = '';
    zipcode?: string = '';
    theme?: string = '';
    contact1?: string = '';
    contact2?: string = '';
    roles: string[] = [];
}

export class LoggedInUser {
    user: User;
    accessToken: string;
    configuration?: any;

    constructor(user: User, accessToken: string, configuration?: any) {
        this.user = user;
        this.accessToken = accessToken;
        this.configuration = configuration;
    }
}
