import { FC } from 'react';
import {
    Section,
    SectionBody,
    SectionHeader,
    SectionHeaderTitle,
    SectionTheme,
} from '@library/section';

export const SettingSection: FC<{ title: string }> = ({ title, children }) => {
    return (
        <div className="setting-section">
            <Section
                theme={SectionTheme.White}
            >
                <SectionHeader>
                    <SectionHeaderTitle>{title}</SectionHeaderTitle>
                </SectionHeader>
                <SectionBody padding>
                    <Section className="setting-container">{children}</Section>
                </SectionBody>
            </Section>
        </div>
    );
};
