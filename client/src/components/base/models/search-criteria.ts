import { SortOrder } from '@library/table/table-component';

export interface ISearchCriteria {
    page: number;
    pageSize: number;
    sortField: string;
    sortOrder: SortOrder;
}
