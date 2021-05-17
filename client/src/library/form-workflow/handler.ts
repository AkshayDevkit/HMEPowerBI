import { FieldValues, FormHandler, FormInstance } from './types';

export class FormHandlerService implements FormHandler {
    constructor(public handlers: FormHandler[]) {
        this.handlers = handlers || [];
    }

    onInitializing = (initialValues: any) => {
        this.handlers.forEach((handler) => {
            initialValues = handler.onInitializing(initialValues);
        });
        return initialValues;
    };

    onReady = async (
        initialValues: FieldValues,
        form: FormInstance<FieldValues>,
    ) => {
        // TODO [NS]: update with await Promise.all
        // this.handlers.forEach(handler => {
        //     handler.onReady(initialValues, form);
        // });
        // this.handlers.forEach(async (x) => {
        //     await x.onReady(initialValues, form);
        // });
        if (this.handlers.length) {
            await this.handlers[0].onReady(initialValues, form);
        }
    };

    onSubmitting = (values: FieldValues, form: FormInstance<FieldValues>) => {
        this.handlers.forEach((handler) => {
            values = handler.onSubmitting(values, form);
        });
        return values;
    };

    onResetting = (values: FieldValues, form: FormInstance<FieldValues>) => {
        this.handlers.forEach((handler) => {
            if (handler.onResetting) {
                values = handler.onResetting(values, form);
            }
        });
        return values;
    };
}
