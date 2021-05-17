import { buildSettingNames } from '@library/dynamic-schema';
import { ReportDefaultSetting } from './report/default.values';
import { AppSettings, ReportSetting } from './types';

export const DefaultSettings: AppSettings = {
    report: buildSettingNames(ReportDefaultSetting) as ReportSetting,
};
