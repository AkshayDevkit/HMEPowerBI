import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { reaction } from 'mobx';
import { Spin } from '@library/spin';
import { Screen } from '@screens/screen';
import { reportSettingStore } from '@components/setting/report';
import { ReportSettingRouter } from './router';
import { Center } from '@library/center';
import { SettingType } from '@components/setting/types';

export const ReportSettingsScreen = () => {
    const history = useHistory();
    useEffect(() => {}, [reportSettingStore.items]);

    useEffect(() => {
        const dispose = reaction(
            () => {
                return [reportSettingStore.items];
            },
            () => {
                const items = reportSettingStore.items.items.filter(
                    (x) => x.type === SettingType.Report,
                );
                if (items.length) {
                    const item = items[0];
                    history.push(
                        ReportSettingRouter.getRoutes().edit.redirect({
                            id: item.id,
                        }),
                    );
                } else {
                    history.push(ReportSettingRouter.getRoutes().new.path);
                }
            },
        );
        return () => {
            dispose();
        };
    }, []);

    useEffect(() => {
        reportSettingStore.list({ filter: { type: SettingType.Report.toString() } });
    }, []);
    return (
        <Screen>
            <Center>
                <Spin spinning={true} />
            </Center>
        </Screen>
    );
};
