import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { Screen } from '@screens/screen';
import { Spliter, SpliterContainer } from '@library/splitter';
import { SideFloater } from '@components/base/components/side-floater';
import { BaseSearchStore, BaseStore } from '@components/base/stores';
import { IModel } from '@components/base/models';
import { IBaseListAdditionalProps, IBaseSearch } from '@components/base/components';
import { BaseRouter, Routes } from './base.router';

export const BaseListScreen = ({
    searchStore,
    store,
    router,
    listComponent,
    searchComponent,
}: {
    searchStore: BaseSearchStore<IModel>;
    store: BaseStore<IModel>;
    router: BaseRouter<Routes>;
    listComponent: React.FC<IBaseListAdditionalProps>;
    searchComponent?: React.FC<IBaseSearch>;
}) => {
    const history = useHistory();
    const SearchComponent = searchComponent as any;
    const ListComponent = listComponent as any;
    useEffect(() => {
        searchStore.search(searchStore.criteria);
    }, []);
    return (
        <Observer>
            {() => (
                <Screen>
                    <Spliter>
                        {!searchStore.visible && SearchComponent && (
                            <SpliterContainer width={'2%'}>
                                <SideFloater title="Search" onClick={searchStore.toggle} />
                            </SpliterContainer>
                        )}
                        {searchStore.visible && SearchComponent && (
                            <SpliterContainer width={'20%'}>
                                <SearchComponent
                                    defaultValues={searchStore.defaultValues}
                                    criteria={searchStore.criteria}
                                    loading={searchStore.loading}
                                    onSearch={(criteria: any) => {
                                        searchStore.search(criteria);
                                    }}
                                    onReset={(criteria: any) => {
                                        searchStore.search(criteria);
                                    }}
                                    onHide={searchStore.toggle}
                                />
                            </SpliterContainer>
                        )}
                        <SpliterContainer
                            width={searchStore.visible ? '78%' : '97%'}
                            style={{ marginLeft: '1em' }}
                        >
                            <ListComponent
                                data={store.items.items}
                                loading={store.loading}
                                onChange={searchStore.change}
                                onNew={() => {
                                    store.clearSelectedItem();
                                    history.push(router.getRoutes().new.path);
                                }}
                                onEdit={(model: IModel) => {
                                    store.clearSelectedItem();
                                    history.push(
                                        router.getRoutes().edit.redirect({
                                            id: model.id,
                                        }),
                                    );
                                }}
                                pagination={{
                                    current: searchStore.criteria.page,
                                    pageSize: searchStore.criteria.pageSize,
                                    total: store.items.count,
                                }}
                                onDelete={(id: string) => {
                                    store.confirmDelete(id);
                                }}
                                onExport={() => {
                                    store.export();
                                }}
                            />
                        </SpliterContainer>
                    </Spliter>
                </Screen>
            )}
        </Observer>
    );
};
