import { PropertyType, PropertyValidationType, PropertyView, ValidationType } from '@library/dynamic-schema';
import { SettingType } from '../types';
import { ReportSetting } from './types';

export const ReportDefaultSetting: ReportSetting = {
    id: '',
    type: SettingType.Report,
    schema: {
        properties: {
            name: {
                label: 'Name',
                type: PropertyType.Text,
                validationType: PropertyValidationType.String,
                validations: [
                    {
                        type: ValidationType.Required,
                    },
                ],
            },
        },
    },
    views: {
        edit: {
            properties: {
                name: {
                    enable: true,
                } as PropertyView,
            },
        },
        list: {
            properties: {
                name: {
                    enable: true,
                } as PropertyView,            },
        },
    },
};
