import { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlipboard } from '@fortawesome/free-brands-svg-icons';
import { models, Report as PowerBIReport, Embed, service, Page } from 'powerbi-client';
import { EmbedType, PowerBIEmbed } from 'powerbi-client-react';
import { ScrollBar } from '@library/scrollbar';
import { message } from '@library/message';
import {
    Section,
    SectionHeader,
    SectionHeaderTitle,
    SectionBody,
    SectionTheme,
    SectionAlignment,
} from '@library/section';
import './style.scss';
import { reportsStore } from './instances';
import { reaction } from 'mobx';
import { Observer } from 'mobx-react-lite';
import { Spin } from '@library/spin';

export const Report = () => {
    // PowerBI Report object (to be received via callback)
    const [report, setReport] = useState<PowerBIReport>();

    // Map of event handlers to be applied to the embedding report
    const eventHandlersMap = new Map([
        [
            'loaded',
            function () {
                console.log('Report has loaded');
            },
        ],
        [
            'rendered',
            function () {
                console.log('Report has rendered');

                // Update display message
                // message.info('The report is rendered');
            },
        ],
        [
            'error',
            function (event?: service.ICustomEvent<any>) {
                if (event) {
                    console.error(event.detail);
                }
            },
        ],
    ]);

    const init = async () => {
        await reportsStore.getByWorkspaceReportId();
    };

    useEffect(() => {
        const dispose = reaction(
            () => {
                return [reportsStore.selectedWorkspaceId, reportsStore.selectedReportId];
            },
            () => {
                init();
            },
        );
        return () => {
            if (dispose) {
                dispose();
            }
        };
    }, []);

    return (
        <Observer>
            {() => (
                <Section theme={SectionTheme.White} className="report">
                    <SectionHeader>
                        <Section align={SectionAlignment.Left}>
                            <SectionHeaderTitle
                                startIcon={<FontAwesomeIcon icon={faFlipboard}></FontAwesomeIcon>}
                            >
                                Report
                            </SectionHeaderTitle>
                        </Section>
                    </SectionHeader>
                    <Spin spinning={reportsStore.loading}>
                        <SectionBody>
                            <ScrollBar autoHeightMax={'calc(100vh - 11.5em)'}>
                                <div className="report-iframe">
                                    {reportsStore.selectedReportConfig && (
                                        <PowerBIEmbed
                                            embedConfig={reportsStore.selectedReportConfig}
                                            eventHandlers={eventHandlersMap}
                                            cssClassName={'sample-report'}
                                            getEmbeddedComponent={(embedObject: Embed) => {
                                                console.log(
                                                    `Embedded object of type "${embedObject.embedtype}" received`,
                                                );
                                                setReport(embedObject as PowerBIReport);
                                            }}
                                        />
                                    )}
                                </div>
                            </ScrollBar>
                        </SectionBody>
                    </Spin>
                </Section>
            )}
        </Observer>
    );
};
