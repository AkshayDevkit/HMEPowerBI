import { AppContext, appService } from '@app';
import { userService } from '@components/user';
import { msalConfig } from './auth-config';
import { AuthType } from './auth-types';
import { AuthService } from './auth.service';
import { AuthStore } from './authStore';

const type = process.env.AUTHENTICATION_TYPE;
if (type) {
    AppContext.setAuthType(type as AuthType);
}

export const authService = new AuthService(
    {
        ...msalConfig,
        type: AppContext.authType,
    },
    userService,
);

export const azureAuthService = new AuthService(
    {
        ...msalConfig,
        type: AuthType.Azure,
    },
    userService,
);

export const authStore = new AuthStore(authService, azureAuthService, userService, appService);
