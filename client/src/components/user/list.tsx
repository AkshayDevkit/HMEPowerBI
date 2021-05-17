import { BaseList, IBaseListProps } from '@components/base/components';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { string } from 'yup';
import { User } from './types';

export interface IUsersProps extends IBaseListProps {}

export const Users = ({
    loading,
    data,
    onNew,
    onEdit,
    pagination,
    onChange,
    onDelete,
    onExport,
}: IUsersProps) => {
    const columns = [
        {
            title: 'User Id',
            dataIndex: 'userId',
            key: 'userId',
            sorter: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: true,
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            sorter: true,
            render: (text: string) => {
                return <span>{capitalize(text)}</span>;
            },
        },
        {
            title: 'Region',
            dataIndex: 'roles',
            key: 'roles',
            sorter: true,
            render: (text: string, user: User) => {
                const isSalesRole = user.roles.includes('sales');
                if (isSalesRole && user.userId != 'ruchirs') {
                    return <span>North America</span>;
                }
                return <span>All</span>;
            },
        },
    ];

    const capitalize = (s: any): string => {
        if (Array.isArray(s)) {
            return s.map((x) => capitalize(x)).join(',');
        }
        if (typeof s !== 'string') return s;
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    return (
        <BaseList
            title="Users"
            columns={columns}
            loading={loading}
            data={data}
            onNew={onNew}
            onEdit={onEdit}
            pagination={pagination}
            onChange={onChange}
            onDelete={onDelete}
            onExport={onExport}
            headerTitleIcon={faUser}
        />
    );
};
