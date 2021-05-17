import { Api } from '@components/base/api/base.api';
import { AppSettings } from '@components/setting';

export class AppService {
    routePath = 'appsettings';

    constructor() {
    }

    get = async (): Promise<AppSettings> => {
        const response = await Api.get<AppSettings>(this.routePath);
        return response.data;
    };
}

export const appService = new AppService();
