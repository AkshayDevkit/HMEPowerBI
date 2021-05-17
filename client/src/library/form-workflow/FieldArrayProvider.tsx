import { ReactNode } from 'react';
import { FieldArrayContext } from './FieldArray';
import { FieldValues, FieldArrayInstance } from './types';

export const FieldArrayProvider = ({
    value,
    children,
}: {
    value: FieldArrayInstance<FieldValues>;
    children?: ReactNode;
}) => {
    return (
        <FieldArrayContext.Provider value={value}>
            {children}
        </FieldArrayContext.Provider>
    );
};
