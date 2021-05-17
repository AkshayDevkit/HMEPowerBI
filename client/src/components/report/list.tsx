import { AppContext } from '@app';
import { BaseList, IBaseListProps } from '@components/base/components';
import { faFlipboard } from '@fortawesome/free-brands-svg-icons';
import { toPropertyViewArray } from '@library/dynamic-schema';

export interface IReport extends IBaseListProps {}

export const Reports = ({
    loading,
    data,
    onNew,
    onEdit,
    pagination,
    onChange,
    onDelete,
    onExport,
}: IReport) => {
    const properties = AppContext.settings.report.views.list.properties;
    const columns = toPropertyViewArray(properties)
        .filter((x) => x.enable)
        .map((x) => {
            return {
                title: x.label,
                dataIndex: x.name,
                key: x.name,
            };
        });

    return (
        <BaseList
            title="Reports"
            columns={columns}
            loading={loading}
            data={data}
            onNew={onNew}
            onEdit={onEdit}
            pagination={pagination}
            onChange={onChange}
            onDelete={onDelete}
            onExport={onExport}
            headerTitleIcon={faFlipboard}
        />
    );
};
