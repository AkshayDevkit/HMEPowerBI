import { ReportStore } from './store';
import { ReportService } from './service';
import { ReportSearchStore } from './search.store';

export const reportsService = new ReportService();
export const reportsStore = new ReportStore(reportsService);
export const reportsSearchStore = new ReportSearchStore(reportsStore);
