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

export const BaseReportScreen = ({
    searchStore,
    store,
    reportComponent,
    searchComponent,
}: {
    searchStore: BaseSearchStore<IModel>;
    store: BaseStore<IModel>;
    router: BaseRouter<Routes>;
    reportComponent: React.FC<IBaseListAdditionalProps>;
    searchComponent?: React.FC<IBaseSearch>;
}) => {
    const history = useHistory();
    const SearchComponent = searchComponent as any;
    const ReportComponent = reportComponent as any;
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
                                <SideFloater title="Navigation" onClick={searchStore.toggle} />
                            </SpliterContainer>
                        )}
                        {searchStore.visible && SearchComponent && (
                            <SpliterContainer width={'18%'}>
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
                            width={searchStore.visible ? '81%' : '97%'}
                            style={{ marginLeft: '1em' }}
                        >
                            <ReportComponent />
                        </SpliterContainer>
                    </Spliter>
                </Screen>
            )}
        </Observer>
    );
};
