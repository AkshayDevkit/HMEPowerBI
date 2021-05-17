import { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFileDownload, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
    Table,
    TablePaginationConfig,
    Key,
    SorterResult,
    TableCurrentDataSource,
} from '@library/table';
import { Button, ButtonType } from '@library/button';
import {
    Section,
    SectionTheme,
    SectionAlignment,
    SectionLayoutType,
    SectionBody,
    SectionHeader,
    SectionHeaderTitle,
} from '@library/section';
import { IModel } from '../models';
import { LIST_IGNORE, Upload } from '@library/upload';
import { FileType } from '@library/util/file';
import { message } from '@library/message';

export interface IBaseListProps {
    loading: boolean;
    data: any[];
    onNew: () => void;
    onEdit: (promotion: IModel) => void;
    pagination: TablePaginationConfig;
    onChange: (
        pagination: TablePaginationConfig,
        filters: Record<string, (Key | boolean)[] | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
        extra: TableCurrentDataSource<any>,
    ) => void;
    onDelete?: (id: string, index: number) => void;
    onExport?: () => void;
    autoHeight?: boolean;
    hasFields?: boolean;
    rowKey?: string;
}

export interface IBaseListAdditionalProps extends IBaseListProps {
    title: string;
    columns: any[];
    headerTitleIcon: IconDefinition;
}

export const BaseList = ({
    title,
    loading,
    data,
    onNew,
    onExport,
    onEdit,
    pagination,
    onChange,
    columns,
    onDelete,
    headerTitleIcon,
    autoHeight,
    hasFields,
    rowKey = 'id',
}: IBaseListAdditionalProps) => {
    const [_columns, setColumns] = useState(columns);
    const deleteColumn = {
        title: 'Delete',
        key: 'delete',
        width: '10em',
        render: (text: string, item: any, index: number) => (
            <Fragment>
                <Button
                    type={ButtonType.Quaternary}
                    startIcon={
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    }
                    onClick={() => {
                        if (onDelete) {
                            onDelete(item.id, index);
                        }
                    }}
                    danger
                >
                    Delete
                </Button>
            </Fragment>
        ),
    };

    useEffect(() => {
        if (onDelete) {
            setColumns([...columns, deleteColumn]);
        }
    }, [data]);

    return (
        <Section theme={SectionTheme.White}>
            <Section>
                <SectionHeader>
                    <Section align={SectionAlignment.Left}>
                        <SectionHeaderTitle
                            startIcon={
                                <FontAwesomeIcon
                                    icon={headerTitleIcon}
                                ></FontAwesomeIcon>
                            }
                        >
                            {title}
                        </SectionHeaderTitle>
                    </Section>
                    <Section
                        layout={SectionLayoutType.Horizontal}
                        align={SectionAlignment.Right}
                        autoSpacing={true}
                    >
                        <Upload
                            beforeUpload={(file) => {
                                if (file.type !== FileType.Excel) {
                                    message.error(
                                        `${file.name} is not a Excel file`,
                                    );
                                }
                                return file.type === FileType.Excel
                                    ? true
                                    : (LIST_IGNORE as any);
                            }}
                            onChange={({ file, fileList }) => {
                                if (file.status !== 'uploading') {
                                    console.log(file, fileList);
                                }
                            }}
                            multiple={false}
                        />
                        {onExport && (
                            <Button
                                startIcon={
                                    <FontAwesomeIcon
                                        icon={faFileDownload}
                                    ></FontAwesomeIcon>
                                }
                                type={ButtonType.Quaternary}
                                onClick={onExport}
                            >
                                Export
                            </Button>
                        )}
                        <Button
                            startIcon={
                                <FontAwesomeIcon
                                    icon={faPlus}
                                ></FontAwesomeIcon>
                            }
                            type={ButtonType.Tertiary}
                            onClick={onNew}
                        >
                            New
                        </Button>
                    </Section>
                </SectionHeader>
            </Section>
            <Section>
                <SectionBody>
                    <Table
                        columns={_columns}
                        dataSource={data}
                        pagination={pagination}
                        loading={loading}
                        onChange={onChange}
                        rowKey={rowKey}
                        height={autoHeight ? '' : 'calc(100vh - 12.1em)'}
                        hasFields={hasFields}
                        rowSelection={
                            onEdit
                                ? {
                                      type: 'radio',
                                      onChange: (
                                          selectedRowKeys,
                                          selectedRows,
                                      ) => {
                                          const record = selectedRows[0];
                                          if (onEdit) {
                                              onEdit(record);
                                          }
                                      },
                                      // selectedRowKeys: rowSelectionKeys,
                                      // type: 'checkbox',
                                      // onChange: (
                                      //     selectedRowKey,
                                      //     selectedRows,
                                      // ) => {},
                                      // selectedRowKeys: rowSelectionKeys,
                                  }
                                : (null as any)
                        }
                    />
                </SectionBody>
            </Section>
        </Section>
    );
};
