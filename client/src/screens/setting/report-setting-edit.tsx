import { ReportSettingEdit, reportSettingStore } from '@components/setting/report';
import { BaseEdit } from '@screens/base';
import { SettingRouter } from './router';

export const ReportSettingEditScreen = () => {
    return (
        <BaseEdit
            component={ReportSettingEdit as any}
            store={reportSettingStore as any}
            router={SettingRouter}
        />
    );
};
