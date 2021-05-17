import { useEffect } from 'react';
import _ from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { Screen } from '@screens/screen';
import { IModel } from '@components/base/models';
import { IBaseForm } from '@components/base/components';
import { BaseStore } from '@components/base/stores';
import { BaseRouter, Routes } from './base.router';

export const BaseEdit = ({
    store,
    router,
    component,
    ...props
}: {
    store: BaseStore<IModel>;
    router: BaseRouter<Routes>;
    component: React.FC<IBaseForm>;
    [key: string]: any;
}) => {
    const history = useHistory();
    let { id } = useParams() as any;
    const Component = component as any;

    const isCreateRoute = history.location.pathname.indexOf('new') > 0;

    useEffect(() => {
        store.clearSelectedItem();
        if (id && !isCreateRoute) {
            store.get(id);
        }
    }, [id]);

    return (
        <Screen>
            <Observer>
                {() => (
                    <div>
                        <Component
                            defaultValues={store.defaultValues}
                            loading={store.loading}
                            model={store.selectedItem}
                            onSave={(model: IModel) => {
                                if (model.id && !isCreateRoute) {
                                    store.update(model.id, model, () => {
                                        store.clearSelectedItem();
                                        history.push(
                                            router.getRoutes().root.path,
                                        );
                                    });
                                } else {
                                    store.create(model, () => {
                                        store.clearSelectedItem();
                                        history.push(
                                            router.getRoutes().root.path,
                                        );
                                    });
                                }
                            }}
                            onCancel={() => {
                                history.goBack();
                            }}
                            {...props}
                        />
                    </div>
                )}
            </Observer>
        </Screen>
    );
};
