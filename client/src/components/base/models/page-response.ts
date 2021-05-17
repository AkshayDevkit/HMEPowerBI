import { IModel } from '.';

export interface IPageResponse<T extends IModel> {
    count: number;
    items: T[];
}
