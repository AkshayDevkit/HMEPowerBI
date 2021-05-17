import { reportsStore, reportsSearchStore, ReportSearch } from '@components/report';
import { BaseReportScreen } from '@screens/base';
import { ReportRouter } from './report.router';
import { ReportEdit } from './report-edit';

export const ReportsScreen = () => {
    return (
        <BaseReportScreen
            reportComponent={ReportEdit}
            searchComponent={ReportSearch as any}
            store={reportsStore as any}
            searchStore={reportsSearchStore as any}
            router={ReportRouter}
        />
    );
};
