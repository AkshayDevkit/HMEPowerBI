import classNames from 'classnames';
import { Table } from 'antd';
import { Observer } from 'mobx-react-lite';
import {
    PanelRender,
    GetComponentProps,
    GetRowKey,
    TableComponents,
    TableSticky,
} from 'rc-table/lib/interface';
import {
    ColumnType,
    ExpandableConfig,
    Key,
    SorterResult,
    TableCurrentDataSource,
    TablePaginationConfig,
    TableRowSelection,
} from 'antd/lib/table/interface';
import { ColumnsType } from 'antd/lib/table';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

export enum SortOrder {
    Descend = 'descend',
    Ascend = 'ascend',
}
export enum TableLayout {
    Auto = 'auto',
    Fixed = 'fixed',
}

export interface ITableComponentProps {
    title?: PanelRender<any>;
    tableLayout?: TableLayout;
    columns?: ColumnsType<any>;
    dataSource?: any[];
    loading?: boolean;
    pagination?: false | TablePaginationConfig;
    scroll?: {
        x?: number | true | string;
        y?: number | string;
    } & {
        scrollToFirstRowOnChange?: boolean;
    };
    bordered?: boolean;
    expandable?: ExpandableConfig<any>;
    rowSelection?: TableRowSelection<any>;
    rowClassName?: string;
    onChange?: (
        pagination: TablePaginationConfig,
        filters: Record<string, (Key | boolean)[] | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
        extra: TableCurrentDataSource<any>,
    ) => void;
    showHeader?: boolean;
    size?: SizeType;
    summary?: (data: readonly any[]) => React.ReactNode;
    footer?: PanelRender<any>;
    onHeaderRow?: GetComponentProps<readonly ColumnType<any>[]>;
    onHeaderCell?: any;
    onRow?: GetComponentProps<any>;
    sortDirections?: SortOrder[];
    showSorterTooltip?: boolean;
    className?: string;
    height?: string;
    rowKey?: string | GetRowKey<any>;
    width?: string;
    components?: TableComponents<any>;
    maxHeight?: string;
    sticky?: boolean | TableSticky;
    hasFields?: boolean;
}

export const TableComponent = ({
    title,
    tableLayout = TableLayout.Auto,
    columns,
    dataSource = [],
    loading,
    pagination,
    scroll,
    bordered,
    expandable,
    rowSelection,
    rowClassName,
    onChange,
    showHeader,
    size,
    summary,
    footer,
    onHeaderRow,
    onHeaderCell,
    onRow,
    sortDirections,
    showSorterTooltip,
    className,
    height,
    rowKey,
    width,
    components,
    maxHeight, // maxHeight = 'calc(100vh - 150px)',
    hasFields,
}: ITableComponentProps) => {
    pagination = {
        position: ['none', 'bottomCenter'] as any,
        current:
            pagination === undefined
                ? 1
                : (pagination as TablePaginationConfig).current,
        showSizeChanger: false,
        hideOnSinglePage: true,
        showTotal: (total: number, range: [number, number]) => (
            <span>Total {total} Records</span>
        ),
        ...pagination,
    };
    scroll = scroll || {
        scrollToFirstRowOnChange: true,
    };
    scroll.y = scroll.y || maxHeight;
    rowSelection = rowSelection
        ? {
              ...rowSelection,
              columnTitle:
                  rowSelection.type === 'radio'
                      ? rowSelection.columnTitle || 'Select'
                      : rowSelection.columnTitle,
              columnWidth: rowSelection.columnWidth || '5em',
          }
        : rowSelection;
    className = classNames(
        !dataSource || !dataSource.length ? `empty` : '',
        hasFields ? 'table-form-fields' : '',
        bordered ? `bordered` : '',
    );
    return (
        <Observer>
            {() => (
                <div className="table">
                    <Table
                        title={title}
                        tableLayout={tableLayout}
                        pagination={pagination}
                        components={components}
                        columns={columns}
                        dataSource={dataSource}
                        loading={loading}
                        scroll={scroll}
                        expandable={expandable}
                        showHeader={showHeader}
                        size={size}
                        summary={summary}
                        rowSelection={rowSelection}
                        rowClassName={rowClassName}
                        onChange={onChange}
                        onHeaderRow={onHeaderRow}
                        // onHeaderCell={onHeaderCell}
                        onRow={onRow}
                        sortDirections={sortDirections}
                        showSorterTooltip={showSorterTooltip}
                        className={className}
                        style={{ height: height, width: width }}
                        rowKey={rowKey}
                        // locale={{ emptyText: 'No matching results found' }}
                        footer={footer}
                    />
                </div>
            )}
        </Observer>
    );
};

export type Record<K extends keyof any, T> = {
    [P in K]: T;
};

export type {
    TablePaginationConfig,
    Key,
    TableCurrentDataSource,
    SorterResult,
};
