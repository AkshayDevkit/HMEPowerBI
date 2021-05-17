import { SideNav, TopNav, Logo } from '@screens/layout';
import './screen.scss';

export const Screen = ({ children }: any) => {
    return (
        <div className="screen">
            <div className="app-header">
                {/* <Logo /> */}
                <TopNav />
            </div>
            <div className="app-body">
                <div className="app-side-nav">
                    <SideNav />
                </div>
                <div className="app-content">{children}</div>
            </div>
            <div className="app-footer"></div>
        </div>
    );
};
