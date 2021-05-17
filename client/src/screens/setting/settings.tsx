import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Label } from '@library/label';
import {
    Section,
    SectionHeader,
    SectionHeaderTitle,
    SectionBody,
    SectionTheme,
    SectionAlignment,
    SectionLayoutType,
} from '@library/section';
import { Screen } from '@screens/screen';
import { ReportSettingRouter } from './router';
import { Observer } from 'mobx-react-lite';

export const SettingsScreen = () => {
    const history = useHistory();

    return (
        <Observer>
            {() => (
                <Screen>
                    <Section theme={SectionTheme.White}>
                        <SectionHeader>
                            <Section align={SectionAlignment.Left}>
                                <SectionHeaderTitle
                                    startIcon={<FontAwesomeIcon icon={faCog}></FontAwesomeIcon>}
                                >
                                    Settings
                                </SectionHeaderTitle>
                            </Section>
                        </SectionHeader>
                        <SectionBody style={{ fontSize: '1.6em', margin: '1em 2em' }}>
                            <Section
                                layout={SectionLayoutType.Horizontal}
                                style={{ justifyContent: 'space-around' }}
                            >
                                <Label
                                    title="View Report Settings"
                                    link
                                    onClick={() => {
                                        history.push(ReportSettingRouter.getRoutes().root.path);
                                    }}
                                ></Label>
                            </Section>
                        </SectionBody>
                    </Section>
                </Screen>
            )}
        </Observer>
    );
};
