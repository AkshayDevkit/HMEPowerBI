import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import {
    Reports,
    reportsStore,
    reportsSearchStore,
    ReportSearch,
} from '@components/report';
import { BaseListScreen } from '@screens/base';
import { ReportRouter } from './report.router';

export const ReportsScreen = () => {
    return (
        <div>
            <BaseListScreen
                listComponent={Reports}
                searchComponent={ReportSearch as any}
                store={reportsStore as any}
                searchStore={reportsSearchStore as any}
                router={ReportRouter}
            />
        </div>
    );
};
