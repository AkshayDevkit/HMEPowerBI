import { AxiosRequestConfig } from 'axios';
import buildQuery, { QueryOptions } from 'odata-query';
import { Api } from '@components/base/api/base.api';
import { BaseModel, IPageResponse } from '../models';
import { IService } from './iservice';
import { downloadExcelFile, File } from '@library/util/file';

export class BaseService<T extends BaseModel> implements IService<T> {
    constructor(public name: string, public routePath: string) {}

    list = async (queryOptions?: Partial<QueryOptions<T>>): Promise<T[]> => {
        const query = buildQuery(queryOptions);
        const response = await Api.get<T[]>(`${this.routePath}${query}`);
        return response.data;
    };

    paginate = async (queryOptions?: Partial<QueryOptions<T>>): Promise<IPageResponse<T>> => {
        const query = buildQuery(queryOptions);
        const response = await Api.get<IPageResponse<T>>(`${this.routePath}${query}`);
        return response.data;
    };

    get = async (id: string, config?: AxiosRequestConfig): Promise<T | null> => {
        const response = await Api.get<T>(`${this.routePath}?id=${id}`, config);
        return response.data;
    };

    create = async (t: T): Promise<T> => {
        const response = await Api.post<T>(`${this.routePath}`, t);
        return response.data;
    };

    createorupdate = async (t: T, queryOptions?: Partial<QueryOptions<T>>): Promise<T> => {
        const query = buildQuery(queryOptions);
        const response = await Api.post<T>(`${this.routePath}/createorupdate${query}`, t);
        return response.data;
    };

    update = async (id: string, t: T): Promise<void> => {
        await Api.put<T>(`${this.routePath}?id=${id}`, t);
    };

    delete = async (id: string): Promise<void> => {
        await Api.delete<T>(`${this.routePath}?id=${id}`);
    };

    export = async (queryOptions?: Partial<QueryOptions<T>>): Promise<void> => {
        const query = buildQuery(queryOptions);
        const response = await Api.get<File>(`${this.routePath}/export`);
        downloadExcelFile(response.data);
    };
}
