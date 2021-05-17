import { View, PropertyView, PropertySchema } from '@library/dynamic-schema';
import { AppSetting } from '../types';

export interface ReportView extends View {
    properties: {
        name: PropertyView;
    };
}

export interface ReportSetting extends AppSetting {
    schema: {
        properties: {
            name: PropertySchema;
        };
    };
    views: {
        edit: ReportView;
        list: ReportView;
    };
}
