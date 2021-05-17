import { Configuration, PopupRequest } from '@azure/msal-browser';

const AzureActiveDirectoryAppClientId: any =
    process.env.AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID ||
    '9a2c75a9-4dd5-4780-9ef3-42fcc4292cde';

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: AzureActiveDirectoryAppClientId,
        authority:
            'https://login.microsoftonline.com/8c3dad1d-b6bc-4f8b-939b-8263372eced6',
    },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
    scopes: [
        'User.Read',
        'User.ReadBasic.All',
        'api://7cf8fedc-63db-4190-946a-2bed6c2f00e4/access_as_user',
    ], // , 'access_as_user'
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
    graphAllEndpoint: 'https://graph.microsoft.com/v1.0/users',
    graphPictureUrl: 'https://graph.microsoft.com/v1.0/me/photo/$value',
};
