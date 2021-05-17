import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Menu } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar } from '@library/avatar';
import { ThemeType } from '@app';
import { UserContext } from '@components/user';
import { authService } from '@auth';
import './../nav.scss';
import './top-nav.scss';

const { SubMenu } = Menu;

export const TopNav = ({ className }: { className?: string }) => {
    if (!UserContext.isLoggedIn) {
        return <div></div>;
    }
    const handleClick = (e: any) => {};
    className = classNames('top-nav-container', className);
    return (
        <div className="nav top-nav">
            <div className={className}>
                <div className="banner">
                    <Menu onClick={handleClick} selectedKeys={[]} mode="horizontal">
                        <Menu.Item key="avatar" direction="rtl" style={{ float: 'right' }}>
                            <Avatar
                                name={''}
                                url={UserContext.LoggedInUser.user.pictureUrl || ''}
                            />
                        </Menu.Item>
                        <SubMenu
                            key={UserContext.LoggedInUser.user.name}
                            title={UserContext.LoggedInUser.user.name}
                            className="settings"
                            style={{ float: 'right', margin: 0 }}
                        >
                            <Menu.Item title={'Select Theme'} key="theme">
                                <span
                                    className={classNames(ThemeType.Red, 'theme-selection')}
                                    onClick={() => {
                                        UserContext.setTheme(ThemeType.Red);
                                    }}
                                ></span>
                                <span
                                    className={classNames(ThemeType.Blue, 'theme-selection')}
                                    onClick={() => {
                                        UserContext.setTheme(ThemeType.Blue);
                                    }}
                                ></span>
                                <span
                                    className={classNames(ThemeType.Green, 'theme-selection')}
                                    onClick={() => {
                                        UserContext.setTheme(ThemeType.Green);
                                    }}
                                ></span>
                                <span
                                    className={classNames(
                                        ThemeType.Purple.toString(),
                                        'theme-selection',
                                    )}
                                    onClick={() => {
                                        UserContext.setTheme(ThemeType.Purple);
                                    }}
                                ></span>
                                <span
                                    className={classNames(ThemeType.Yellow, 'theme-selection')}
                                    onClick={() => {
                                        UserContext.setTheme(ThemeType.Yellow);
                                    }}
                                ></span>
                            </Menu.Item>
                            <Menu.Item title={'Settings'} key="setting" icon={<SettingOutlined />}>
                                <Link to="/settings">Settings</Link>
                            </Menu.Item>
                            <Menu.Item
                                title={'Logout'}
                                key="logout"
                                icon={<LogoutOutlined />}
                                onClick={authService.logout}
                            >
                                Logout
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        </div>
    );
};
