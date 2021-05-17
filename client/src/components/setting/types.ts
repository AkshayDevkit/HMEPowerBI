import { Setting } from '@library/dynamic-schema';
import { ReportSetting } from './report/types';

export enum SettingType {
    User = 1,
    Report = 2,
}

export interface AppSetting extends Setting {
    type: SettingType;
}

export interface AppSettings {
    report: ReportSetting;
}

export type { ReportSetting };
