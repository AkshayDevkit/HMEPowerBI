import {
    AccountInfo,
    AuthenticationResult,
    IPublicClientApplication,
    PublicClientApplication,
} from '@azure/msal-browser';
import { IAuthConfiguration } from './../auth-types';
import { graphConfig, loginRequest } from './../auth-config';
import { AuthService, IAuthService } from './../auth.service';
import { User, LoggedInUser, UserService } from '@components/user';
import { AppContext } from '@app';

export class AzureAuthService implements IAuthService {
    constructor(
        public config: IAuthConfiguration,
        public authService: AuthService,
        public userService: UserService,
    ) {}

    handleUnauthorized = (): void => {
        this.logIn();
    };

    logIn = async (model?: any): Promise<LoggedInUser> => {
        const instance = new PublicClientApplication(this.config);

        const authenticationResult = await instance.loginPopup(loginRequest);
        const account = this.getAzureAccountFromAuthenticationResult(
            instance,
            authenticationResult,
        );
        const tokenResponse = await instance.acquireTokenSilent({
            ...loginRequest,
            account: account,
        });
        const pictureUrl = await this.getAzureUserPicture(tokenResponse.accessToken);
        const azureUser = this.getUserFromAzureTokenResponse(tokenResponse, pictureUrl);
        let user = await this.userService.getByUserId(azureUser.userId);
        if (user === null) {
            azureUser.theme = AppContext.theme;
            user = await this.userService.create(azureUser);
        }
        user.pictureUrl = azureUser.pictureUrl;
        return new LoggedInUser(
            user,
            tokenResponse.accessToken,
            tokenResponse,
        );
    };

    logout = async (): Promise<void> => {
        const instance = new PublicClientApplication(this.config);
        await instance.logout();
    };

    private getUserFromAzureTokenResponse = (
        tokenResponse: AuthenticationResult,
        pictureUrl: string,
    ): User => {
        const name = tokenResponse.account?.name;
        return {
            id: '',
            userId: tokenResponse.account?.username,
            firstName: name?.split(' ')[0],
            lastName: name && name.split(' ').length > 1 ? name?.split(' ')[1] : '',
            name: tokenResponse.account?.name,
            email: tokenResponse.account?.username,
            pictureUrl: pictureUrl,
        } as any;
    };

    private getAzureAccountFromAuthenticationResult(
        instance: IPublicClientApplication,
        response: AuthenticationResult,
    ) {
        if (response != null && response.account != null) {
            return response.account;
        } else {
            return this.getAzureAccount(instance);
        }
    }

    private getAzureAccount(instance: IPublicClientApplication): AccountInfo | undefined {
        const currentAccounts = instance.getAllAccounts();
        if (currentAccounts === null) {
            // @ts-ignore
            console.error('No accounts detected');
            return undefined;
        }

        if (currentAccounts.length > 1) {
            // TBD: Add choose account code here
            // @ts-ignore
            console.error('Multiple accounts detected, need to add choose account code.');
            return currentAccounts[0];
        } else if (currentAccounts.length === 1) {
            return currentAccounts[0];
        }
    }

    private async getAzureUserPicture(accessToken: string) {
        const headers = new Headers();
        const bearer = `Bearer ${accessToken}`;
        headers.append('Authorization', bearer);
        const options = {
            method: 'GET',
            headers: headers,
        };

        const binaryImageResponse = (await fetch(graphConfig.graphPictureUrl, options)
            .then((response) => response)
            .catch((error) => console.error(error))) as Response;
        var blob = await binaryImageResponse.blob();
        const url = window.URL || window.webkitURL;
        const blobUrl = url.createObjectURL(blob);
        return blobUrl;
    }
}
