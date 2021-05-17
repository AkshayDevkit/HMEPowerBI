import { action, makeObservable, observable } from 'mobx';
import {
    TablePaginationConfig,
    Key,
    SorterResult,
    TableCurrentDataSource,
    SortOrder,
} from '@library/table';
import { BaseStaticStore } from '.';
import { BaseModel, ISearchCriteria } from '../models';

export abstract class BaseStaticSearchStore<IModel extends BaseModel> {
    loading = false;
    criteria: ISearchCriteria = {
        page: 1,
        pageSize: 10,
        sortField: 'id',
        sortOrder: SortOrder.Descend,
    };
    visible: boolean = false;
    abstract defaultValues: any;

    constructor(public store: BaseStaticStore<IModel>) {
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
    };
}
