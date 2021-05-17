import { IModel } from './imodel';

export abstract class BaseModel implements IModel {
    id: string = '';
    metadata?: any;
}
