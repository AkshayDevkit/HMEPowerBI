import { ColumnsType } from 'antd/lib/table';
import React, { useState, useEffect } from 'react';
import { TableComponent, ITableComponentProps } from './table-component';
import './table.scss';

export interface ITableProps extends ITableComponentProps {
    dragColumns?: boolean;
    resizeColumns?: boolean;
    defaultColumnWidth?: string;
    emptyPlaceholderHeight?: string;
    maxHeight?: string;
}

export const Table = ({
    columns,
    dataSource,
    components,
    dragColumns = true,
    resizeColumns = true,
    defaultColumnWidth = '6em',
    rowSelection,
    height,
    scroll,
    emptyPlaceholderHeight = '20em',
    maxHeight = 'calc(100vh - 12.5em)',
    ...props
}: ITableProps) => {
    const [tableColumns, setTableColumns] = useState<
        ColumnsType<any> | undefined
    >(columns);
    scroll = scroll || {};

    // Uncomment for Fix Heigh
    // scroll.y = scroll.y || maxHeight;

    // const handleResizeColumns = () => {
    //     const htmlDocumentFontSize = getHtmlDocumentFontSize();
    //     // 1.2 is the table font-size
    //     const fontSize = parseNumberFromCssValue(htmlDocumentFontSize) * 1.2;
    //     columns = resizeTableColumns(
    //         columns,
    //         tableColumns,
    //         setTableColumns,
    //         defaultColumnWidth,
    //         fontSize,
    //     );
    //     components = resizeTableComponents(components, fontSize);
    // };

    if (resizeColumns) {
        // handleResizeColumns();
    }
    useEffect(() => {
        setTableColumns(columns);
    }, [columns]);

    const table = (
        <TableComponent
            {...props}
            dataSource={dataSource}
            columns={tableColumns}
            components={components}
            rowSelection={rowSelection}
            height={height}
            scroll={scroll}
        />
    );

    return <div className="table-wrapper">{table}</div>;
};
