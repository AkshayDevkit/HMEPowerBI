import classNames from 'classnames';
import { UserContext } from '@components/user';
import './logo.scss';
import { Tooltip } from '@library/tooltip';

export enum LogoSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
    ExtraLarge = 'extra-large',
}

export const Logo = ({ size = LogoSize.Small, src }: { size?: LogoSize; src?: string }) => {
    const className = classNames(size, 'logo');
    return (
        <div className="logo-container">
            <div className={className}>
                <div className="logo-wrapper">
                    <Tooltip placement={'right'} title="Power BI Reports">
                        <img src={src || '/logo.png'} alt="Power BI Reports" />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};
