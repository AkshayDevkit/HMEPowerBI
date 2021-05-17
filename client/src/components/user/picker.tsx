import { useState, useEffect } from 'react';
import { Dropdown, DropdownType } from '@library/dropdown';
import { User } from './types';
import { userService } from './instances';

export const UserPicker = ({ name, value, onChange, onBlur }: any) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getUsers = async (key?: string) => {
        try {
            setLoading(true);
            let users = await userService.list({
                filter: {
                    or: [
                        key
                            ? {
                                  name: {
                                      startswith: key,
                                  },
                              }
                            : {},
                        key
                            ? {
                                  name: {
                                      contains: key,
                                  },
                              }
                            : {},
                        value
                            ? {
                                  id: {
                                      eq: value,
                                  },
                              }
                            : {},
                    ],
                },
                select: ['id', 'name'],
                top: 20,
            });
            setUsers(users);
        } finally {
            setLoading(false);
        }
    };

    // TODO: this should not fire at value set from external, fix in dropdown component
    const handleDebouncedValueChange = (debouncedValue: string) => {
        getUsers(debouncedValue);
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (value && !users.find((x) => x.id === value)) {
            getUsers();
        }
    }, [value]);

    return (
        <Dropdown
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={DropdownType.AutoComplete}
            textField={'name'}
            valueField={'id'}
            dataItemKey={'id'}
            loading={loading}
            data={users}
            filterable={true}
            onDebouncedValueChange={handleDebouncedValueChange}
        />
    );
};
