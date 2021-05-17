import { action, makeObservable, observable } from 'mobx';
import _cloneDeep from 'lodash/cloneDeep';
import { AppSettings, DefaultSettings } from '@components/setting';
import { AppError } from '@library/util/error';
import { AuthType } from './../auth/auth-types';
import { buildAppSetting } from '@library/dynamic-schema';

export enum ThemeType {
    Blue = 'blue',
    Green = 'green',
    Red = 'red',
    Purple = 'purple',
    Yellow = 'yellow',
}

class AppStore {
    loading = false;
    theme: ThemeType = ThemeType.Red;
    authType: AuthType = AuthType.UsernamePassword;
    errors: AppError[] = [];
    settings: AppSettings;

    constructor() {
        this.settings = (buildAppSetting(_cloneDeep(DefaultSettings) as any) as any) as AppSettings;
        makeObservable(this, {
            loading: observable,
            theme: observable,
            errors: observable,
            settings: observable,
            setAuthType: action,
            setAppSettings: action,
        });
    }

    setAppSettings(appSettings: AppSettings) {
        appSettings.report = appSettings.report || DefaultSettings.report;
        this.settings = (buildAppSetting(appSettings as any) as any) as AppSettings;
    }

    setAuthType(authType: AuthType): void {
        this.authType = authType;
    }

    setErrors(errors: AppError[]): void {
        this.errors = errors;
    }

    clearErrors(): void {
        this.errors = [];
    }
}

const appStore = new AppStore();
export { appStore as AppContext };
