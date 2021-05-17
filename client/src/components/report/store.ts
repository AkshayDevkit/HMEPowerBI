import { action, computed, makeObservable, observable } from 'mobx';
import { EmbedType } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { BaseStore } from '@components/base/stores';
import { ReportModel } from './types';
import { ReportService } from './service';
import { message } from '@library/message';
import { UserContext } from '@components/user';

export class ReportStore extends BaseStore<ReportModel> {
    defaultValues: any = {
        id: '',
    };
    navigationLoading = false;
    reports: any[] = [];
    selectedWorkspaceId: string = '';
    selectedReportId: string = '';
    selectedReport: any = null;

    constructor(public reportService: ReportService) {
        super(reportService);
        makeObservable(this, {
            reports: observable,
            selectedReport: observable,
            navigationLoading: observable,
            selectedWorkspaceId: observable,
            selectedReportId: observable,
            selectedReportConfig: computed,
            setReportSelection: action,
        });
    }

    get selectedReportConfig(): any {
        if (!this.selectedReport) {
            return null;
        }
        return {
            type: EmbedType.Report,
            embedUrl: this.selectedReport.embedUrl,
            tokenType: models.TokenType.Embed,
            accessToken: this.selectedReport.embedToken.token,
            filters: this.createFilterArray(),
            settings: {
                filterPaneEnabled: true,
                navContentPaneEnabled: true,
            },
        };
    }

    getNavigation = async (): Promise<void> => {
        try {
            this.navigationLoading = true;
            this.reports = (await this.reportService.getReport()) as [];

            if (this.reports.length) {
                const defaultWorkspace = this.reports[0];
                const defaultReport =
                    Array.isArray(defaultWorkspace.reports) && defaultWorkspace.reports.length
                        ? defaultWorkspace.reports[0]
                        : null;
                if (defaultWorkspace && defaultReport) {
                    this.setReportSelection(defaultWorkspace.workspaceId, defaultReport.id);
                } else {
                    message.error('No reports found, kindly create one.');
                }
            }
        } finally {
            this.navigationLoading = false;
        }
    };

    getByWorkspaceReportId = async (): Promise<void> => {
        try {
            this.loading = true;
            this.selectedReport = await this.reportService.getReport(
                this.selectedWorkspaceId,
                this.selectedReportId,
            );
        } finally {
            this.loading = false;
        }
    };

    setReportSelection = async (workspaceId: string, reportId: string): Promise<void> => {
        this.selectedWorkspaceId = workspaceId;
        this.selectedReportId = reportId;
    };

    clearReportSelection = async (): Promise<void> => {
        this.selectedWorkspaceId = '';
        this.selectedReportId = '';
    };

    createFilterArray() {
        const filters: any[] = [];
        const isSalesRole = UserContext.LoggedInUser.user.roles.includes('sales');
        if (isSalesRole && UserContext.LoggedInUser.user.userId != 'ruchirs') {
            filters.push(this.setBasicFilterByAirline(true));
        }
        return filters;
    }

    setBasicFilterByAirline(applyMemberFilter: boolean = false) {
        const basicFilter: models.IBasicFilter = {
            $schema: 'http://powerbi.com/product/schema#basic',
            target: {
                table: 'DimGeography',
                column: 'ContinentName',
            },
            operator: 'In',
            values: ['North America'], // this.currentUser.Airline
            filterType: 1, // pbi.models.FilterType.BasicFilter,
            requireSingleSelection: true,
            displaySettings: {
                // isHiddenInViewMode: applyMemberFilter,
                isLockedInViewMode: false,
            },
        };
        return basicFilter;
    }

    setReportFilterByCurrency() {
        const advancedCurrencyFilter: models.IBasicFilter = {
            $schema: 'http://powerbi.com/product/schema#basic',
            target: {
                table: 'Currency',
                column: 'CurrencyCd',
            },
            operator: 'In',
            values: ['dollar'], // this.currentUser.CurrencyCode
            filterType: 1, // pbi.models.FilterType.BasicFilter,
            requireSingleSelection: true, // Limits selection of values to one.
        };
        return advancedCurrencyFilter;
    }
}
