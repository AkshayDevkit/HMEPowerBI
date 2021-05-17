import { action, makeObservable, observable } from 'mobx';
import {
    TablePaginationConfig,
    Key,
    SorterResult,
    TableCurrentDataSource,
    SortOrder,
} from '@library/table';
import { QueryOptions } from 'odata-query';
import { BaseStore } from '.';
import { BaseModel, ISearchCriteria } from '../models';

export abstract class BaseSearchStore<IModel extends BaseModel> {
    loading = false;
    criteria: ISearchCriteria = {
        page: 1,
        pageSize: 10,
        sortField: 'id',
        sortOrder: SortOrder.Descend,
    };
    visible: boolean = true;
    abstract defaultValues: any;

    constructor(public store: BaseStore<IModel>) {
        makeObservable(this, {
            loading: observable,
            visible: observable,
            change: action,
            toggle: action,
        });
    }

    toggle = () => {
        this.visible = !this.visible;
    };

    search = async (criteria: any) => {
        this.criteria = {
            ...(criteria || {}),
        };
        const defaultQueryOptions = this.buildDefaultQueryOptions();
        const queryOptions = this.buildQueryOptions(defaultQueryOptions);
        this.store.paginate(queryOptions);
    };

    change = async (
        pagination: TablePaginationConfig,
        filters: Record<string, (Key | boolean)[] | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
        extra: TableCurrentDataSource<any>,
    ) => {
        this.criteria = {
            ...this.criteria,
            page: pagination.current as number,
            pageSize: pagination.pageSize as number,
        };
        if ((sorter as any).field) {
            this.criteria.sortField = (sorter as any).field;
            this.criteria.sortOrder = (sorter as any).order;
        }
        const defaultQueryOptions = this.buildDefaultQueryOptions();
        const queryOptions = this.buildQueryOptions(defaultQueryOptions);
        this.store.paginate(queryOptions);
    };

    public buildDefaultQueryOptions = (
        queryOptions?: Partial<QueryOptions<IModel>>,
    ): Partial<QueryOptions<IModel>> => {
        queryOptions = queryOptions || {};
        queryOptions.top = this.criteria.pageSize;
        queryOptions.skip = this.criteria.page - 1;
        if (this.criteria.sortField) {
            const order =
                this.criteria.sortOrder === SortOrder.Ascend ? 'asc' : 'desc';
            queryOptions.orderBy = [
                `${this.criteria.sortField} ${order}`,
            ] as any;
        }
        return queryOptions;
    };

    abstract buildQueryOptions(
        queryOptions?: Partial<QueryOptions<IModel>>,
    ): Partial<QueryOptions<IModel>>;
}
