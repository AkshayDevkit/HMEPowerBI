import { makeObservable, observable, action } from 'mobx';
import { SortOrder } from '@library/table';
import { QueryOptions } from 'odata-query';
import { BaseSearchStore } from '@components/base/stores';
import { ISearchCriteria } from '../base/models';
import { User } from './types';
import { UserStore } from './store';

export interface IUserSearchCriteria extends ISearchCriteria {
    name?: string;
    userId: string;
    firstName: string;
    lastName: string;
    email?: string;
}

export class UserSearchStore extends BaseSearchStore<User> {
    loading = false;
    defaultValues: any = null;
    criteria: IUserSearchCriteria = null as any;

    constructor(public store: UserStore) {
        super(store);
        this.criteria = {
            page: 1,
            pageSize: 10,
            sortField: 'name',
            sortOrder: SortOrder.Ascend,
            name: '',
        } as IUserSearchCriteria;
        this.defaultValues = this.criteria;
        makeObservable(this, {
            criteria: observable,
        });
    }

    buildQueryOptions = (
        queryOptions?: Partial<QueryOptions<User>>,
    ): Partial<QueryOptions<User>> => {
        queryOptions = this.buildDefaultQueryOptions(queryOptions);
        queryOptions.filter = {
            and: [
                this.criteria.userId
                    ? {
                          userId: this.criteria.userId,
                      }
                    : {},
                this.criteria.firstName
                    ? {
                          firstName: {
                              contains: this.criteria.firstName,
                          },
                      }
                    : {},
                this.criteria.lastName
                    ? {
                          lastName: {
                              contains: this.criteria.lastName,
                          },
                      }
                    : {},
                this.criteria.email
                    ? {
                          email: {
                              contains: this.criteria.email,
                          },
                      }
                    : {},
            ],
        };
        return queryOptions;
    };
}
