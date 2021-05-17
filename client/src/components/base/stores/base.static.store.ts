import { makeObservable, observable, action } from 'mobx';
import { confirm } from '@library/modal';
import { message } from '@library/message';
import { BaseModel } from '../models';

export abstract class BaseStaticStore<IModel extends BaseModel> {
    loading = false;
    items: IModel[] = [];
    selectedItem: IModel = {
        id: '',
    } as any;
    abstract defaultValues: any;

    constructor(public name: string) {
        makeObservable(this, {
            loading: observable,
            items: observable,
            selectedItem: observable,
            create: action,
            update: action,
            delete: action,
            confirmDelete: action,
            clearSelectedItem: action,
        });
    }

    get = async (id: string) => {
        try {
            this.loading = true;
            const item = this.items.find((x) => x.id === id);
            if (item) {
                this.selectedItem = item;
            } else {
                this.selectedItem = {
                    id: '',
                } as any;
            }
        } finally {
            this.loading = false;
        }
    };

    create = async (model: IModel, onCreate?: () => void) => {
        try {
            this.loading = true;
            this.items.push(model);
            message.success(`${this.name} has been added successfully.`);
            if (onCreate) {
                onCreate();
            }
        } finally {
            this.loading = false;
        }
    };

    update = async (id: string, model: IModel, onUpdate?: () => void) => {
        try {
            this.loading = true;
            this.items = this.items.map(function (item, index) {
                return item.id === id ? model : item;
            });
            message.success(`${this.name} has been updated successfully.`);
            if (onUpdate) {
                onUpdate();
            }
            this.get(id);
        } finally {
            this.loading = false;
        }
    };

    confirmDelete = async (id: string, onDelete?: () => void) => {
        confirm({
            content: `Are you sure you want to delete?`,
            onOk: () => {
                this.delete(id, onDelete);
            },
        });
    };

    delete = async (id: string, onDelete?: () => void) => {
        try {
            this.loading = true;
            const item = this.items.find((x) => x.id === id);
            if (item) {
                this.items.splice(this.items.indexOf(item), 1);
                message.success(`${this.name} has been deleted successfully.`);
                if (onDelete) {
                    onDelete();
                }
            }
        } finally {
            this.loading = false;
        }
    };

    clearSelectedItem = () => {
        this.selectedItem = {
            id: '',
        } as any;
    };
}
