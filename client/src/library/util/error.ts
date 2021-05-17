export enum AppErrorSeverity {
    Error = 0,
    Warning = 1,
    Info = 2,
}

export enum AppErrorType {
    Request = 1,
    Network = 2,
    Validation = 3,
    Authentication = 4,
    Authorization = 5,
    Response = 10,
}

export class AppError {
    errorMessage: string = '';
    description?: string;
    type: AppErrorType = AppErrorType.Response;
    severity?: AppErrorSeverity = AppErrorSeverity.Error;
    propertyName?: string;
}

export const getErrors = (error: any): AppError[] => {
    const url = error.config ? formatApiUrl(error.config.url) : '';
    // Handle errors
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorDetails = error.response.data;
        if (Array.isArray(errorDetails.errors)) {
            return (errorDetails.errors as AppError[]).map((x) => {
                return {
                    ...x,
                    type: AppErrorType.Validation,
                };
            });
        } else {
            return [getAppErrorFromErrorStatusCode(error.response, url)];
        }
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return [
            {
                errorMessage: `Network Error${url}`,
                description: 'ERR_CONNECTION_REFUSED',
                type: AppErrorType.Network,
            },
        ];
    } else {
        // Something happened in setting up the request that triggered an Error
        return [
            {
                errorMessage: `Request Error${url}`,
                description: error ? error.message : '',
                type: AppErrorType.Request,
            },
        ];
    }
};

const getAppErrorFromErrorStatusCode = (error: any, url: string): AppError => {
    switch (error.status) {
        case 403:
        case 401:
            return {
                errorMessage: `Unauthorized or Resource does not exists`,
                description: '',
                type: AppErrorType.Authorization,
            };
    }
    const errorDetails = error.response?.data;
    return {
        errorMessage: `Something went wrong ${url}`,
        description:
            errorDetails && errorDetails.message
                ? errorDetails.message
                : error.response?.statusText,
        type: AppErrorType.Response,
    };
};

const formatApiUrl = (apiUrl: string) => {
    if (!apiUrl) {
        return apiUrl;
    }
    return (
        ` for api ` +
        apiUrl
            .toLowerCase()
            .split('/')
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(' ')
    );
};
