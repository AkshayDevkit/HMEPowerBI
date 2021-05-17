import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeFilled, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { UserContext } from '@components/user';
import './../nav.scss';
import './side-nav.scss';

export const SideNav = () => {
    const handleClick = (e: any) => {};
    if (!UserContext.isLoggedIn) {
        return <div></div>;
    }
    return (
        <div className="nav side-nav">
            <Menu onClick={handleClick} selectedKeys={[]} mode="vertical-left">
                {/* <Menu.Item key="home" icon={<HomeFilled />}>
                    <Link to="/">Summary</Link>
                </Menu.Item> */}
                <Menu.Item key="order-promotion-weightage" icon={<AppstoreOutlined />}>
                    <Link to="/report">Home</Link>
                </Menu.Item>
                <Menu.Item key="user" icon={<UserOutlined />}>
                    <Link to="/user">Users</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
};
