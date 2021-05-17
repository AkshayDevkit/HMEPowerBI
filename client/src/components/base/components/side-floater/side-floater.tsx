import {
    Section,
    SectionHeader,
    SectionHeaderTitle,
    SectionAlignment,
    SectionBody,
    SectionTheme,
} from '@library/section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import './side-floater.scss';

export const SideFloater = ({
    title,
    onClick,
}: {
    title: string;
    onClick?: any;
}) => {
    return (
        <Section theme={SectionTheme.White} className="side-floater">
            <SectionHeader>
                <Section align={SectionAlignment.Left}>
                    <SectionHeaderTitle
                        startIcon={
                            <FontAwesomeIcon
                                style={{
                                    cursor: 'pointer',
                                }}
                                icon={faArrowCircleRight}
                                onClick={onClick}
                            ></FontAwesomeIcon>
                        }
                    ></SectionHeaderTitle>
                </Section>
            </SectionHeader>
            <SectionBody>{title}</SectionBody>
        </Section>
    );
};
