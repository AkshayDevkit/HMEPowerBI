import { useEffect } from 'react';
import { Observer } from 'mobx-react-lite';
import { Menu } from 'antd';
import { Tooltip } from '@library/tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { ScrollBar } from '@library/scrollbar';
import {
    Section,
    SectionHeader,
    SectionHeaderTitle,
    SectionBody,
    SectionFooter,
    SectionTheme,
    SectionAlignment,
    SectionLayoutType,
} from '@library/section';
import { Spin } from '@library/spin';
import { reportsStore } from './instances';

const { SubMenu } = Menu;

export const ReportSearch = () => {
    const init = async () => {
        await reportsStore.getNavigation();
    };

    useEffect(() => {
        init();
    }, []);

    const qbr = 'QBR – Airline Quarterly Business';

    return (
        <Observer>
            {() => (
                <Section theme={SectionTheme.White}>
                    <SectionHeader>
                        <Section align={SectionAlignment.Left}>
                            <SectionHeaderTitle
                                startIcon={<FontAwesomeIcon icon={faList}></FontAwesomeIcon>}
                            >
                                Reports
                            </SectionHeaderTitle>
                        </Section>
                        <Section
                            layout={SectionLayoutType.Horizontal}
                            align={SectionAlignment.Right}
                            autoSpacing={true}
                        ></Section>
                    </SectionHeader>
                    <Spin spinning={reportsStore.navigationLoading}>
                        <SectionBody padding>
                            <ScrollBar autoHeightMax={'calc(100vh - 15.2em)'}>
                                <Menu
                                    defaultOpenKeys={[
                                        reportsStore.reports.length
                                            ? reportsStore.reports[0].workspaceId
                                            : 0,
                                    ]}
                                    mode="inline"
                                >
                                    {reportsStore.reports
                                        .filter(
                                            (m) =>
                                                m.workspaceName.trim().toLowerCase() !=
                                                qbr.trim().toLowerCase(),
                                        )
                                        .map((workspace) => {
                                            return (
                                                <SubMenu
                                                    key={workspace.workspaceId}
                                                    title={workspace.workspaceName}
                                                >
                                                    {((workspace.reports || []) as []).map(
                                                        (report: any) => {
                                                            return (
                                                                <Menu.Item
                                                                    key={report.id}
                                                                    onClick={() => {
                                                                        reportsStore.setReportSelection(
                                                                            workspace.workspaceId,
                                                                            report.id,
                                                                        );
                                                                    }}
                                                                >
                                                                    <Tooltip
                                                                        title={report.name}
                                                                        placement={'right'}
                                                                    >
                                                                        {report.name}
                                                                    </Tooltip>
                                                                </Menu.Item>
                                                            );
                                                        },
                                                    )}
                                                </SubMenu>
                                            );
                                        })}
                                </Menu>
                            </ScrollBar>
                        </SectionBody>
                    </Spin>
                </Section>
            )}
        </Observer>
    );
};
