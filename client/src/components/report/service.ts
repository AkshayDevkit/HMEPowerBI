import { Api } from '@components/base/api/base.api';
import { IService, BaseService } from '@components/base/services';
import { ReportModel } from './types';

export class ReportService extends BaseService<ReportModel> implements IService<ReportModel> {
    constructor() {
        super('Report', 'powerbi');
    }

    create = async (report: ReportModel): Promise<ReportModel> => {
        delete (report as any).variants;
        const response = await Api.post<ReportModel>(`${this.routePath}`, report);
        return response.data;
    };

    getReport = async (workspaceId?: string, reportId?: string): Promise<any> => {
        const workspaceIdParam = workspaceId ? `?workspaceId=${workspaceId}` : '';
        const reportIdParam = reportId ? `&reportId=${reportId}` : '';
        const response = await Api.get(`${this.routePath}${workspaceIdParam}${reportIdParam}`);
        return response.data;
    };
}
