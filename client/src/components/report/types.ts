import { BaseModel } from '@components/base/models/base.model';

export class ReportModel extends BaseModel {
    name: string = '';
    department?: string;
    category: string = '';
    subCategory?: string;
    manufacturer?: string;
}
