import { IService, BaseService } from '@components/base/services';
import { BaseStore } from '@components/base/stores';
import { makeObservable, observable } from 'mobx';
import { QueryOptions } from 'odata-query';
import { BaseSearchStore } from '@components/base/stores';
import { ISearchCriteria } from '@components/base/models';
import { ReportSetting } from '../types';
import { ReportDefaultSetting } from './default.values';

export class ReportSettingService
    extends BaseService<ReportSetting>
    implements IService<ReportSetting> {
    constructor() {
        super('Report Setting', 'reportsetting');
    }
}

export class ReportSettingStore extends BaseStore<ReportSetting> {
    defaultValues: any = ReportDefaultSetting;
    constructor(settingService: ReportSettingService) {
        super(settingService);
    }
}

interface SettingSearchCriteria extends ISearchCriteria {
    name: string;
}

export class ReportSettingSearchStore extends BaseSearchStore<ReportSetting> {
    loading = false;
    defaultValues: any = null;
    criteria: SettingSearchCriteria = null as any;

    constructor(public store: ReportSettingStore) {
        super(store);
        this.defaultValues = this.criteria;
        makeObservable(this, {
            criteria: observable,
        });
    }

    buildQueryOptions = (
        queryOptions?: Partial<QueryOptions<ReportSetting>>,
    ): Partial<QueryOptions<ReportSetting>> => {
        queryOptions = this.buildDefaultQueryOptions(queryOptions);
        queryOptions.filter = this.criteria.name
            ? {
                  name: this.criteria.name,
              }
            : {};
        return queryOptions;
    };
}

export const reportSettingService = new ReportSettingService();
export const reportSettingStore = new ReportSettingStore(reportSettingService);
export const reportSettingSearchStore = new ReportSettingSearchStore(reportSettingStore);
