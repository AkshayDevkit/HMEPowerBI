import { Configuration } from '@azure/msal-browser';

export enum AuthType {
    Azure = 'Azure',
    UsernamePassword = 'UsernamePassword',
}

export interface IAuthConfiguration extends Configuration {
    type: AuthType;
}
