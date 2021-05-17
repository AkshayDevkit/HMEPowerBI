import { makeObservable, observable } from 'mobx';
import { SortOrder } from '@library/table';
import { QueryOptions } from 'odata-query';
import { BaseSearchStore } from '@components/base/stores';
import { ISearchCriteria } from '../base/models';
import { ReportModel } from './types';
import { ReportStore } from './store';

export interface IReportSearchCriteria extends ISearchCriteria {
    name: string;
}

export class ReportSearchStore extends BaseSearchStore<ReportModel> {
    loading = false;
    defaultValues: any = null;
    criteria: IReportSearchCriteria = null as any;

    constructor(public store: ReportStore) {
        super(store);
        this.criteria = {
            page: 1,
            pageSize: 10,
            sortField: 'id',
            sortOrder: SortOrder.Descend,
        } as IReportSearchCriteria;
        this.defaultValues = this.criteria;
        makeObservable(this, {
            criteria: observable,
        });
    }

    buildQueryOptions = (
        queryOptions?: Partial<QueryOptions<ReportModel>>,
    ): Partial<QueryOptions<ReportModel>> => {
        queryOptions = this.buildDefaultQueryOptions(queryOptions);
        queryOptions.filter = {
            and: [
                this.criteria.name
                    ? {
                          name: {
                              contains: this.criteria.name,
                          },
                      }
                    : {},
            ],
        };
        return queryOptions;
    };
}
