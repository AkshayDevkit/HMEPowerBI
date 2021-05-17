import { ReactNode } from 'react';
import './filter-table.scss';

export const FilterTable = ({ children }: { children: ReactNode[] }) => {
    return (
        <div className="filter-table">
            <div className="filter-table-content">{children}</div>
        </div>
    );
};

export const FilterTableHeader = ({ children }: { children: ReactNode[] }) => {
    return <div className="filter-table-header">{children}</div>;
};

export const FilterTableBody = ({ children }: { children: ReactNode[] }) => {
    return <div className="filter-table-body">{children}</div>;
};
