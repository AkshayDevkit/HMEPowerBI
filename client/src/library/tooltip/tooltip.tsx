import { Tooltip as AntTooltip } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';

export const Tooltip = ({
    placement,
    title,
    arrowPointAtCenter,
    children,
}: {
    placement: TooltipPlacement;
    title: string;
    arrowPointAtCenter?: any;
    children?: any;
}) => {
    return (
        <AntTooltip
            placement={placement}
            title={title}
            arrowPointAtCenter={arrowPointAtCenter}
        >
            {children}
        </AntTooltip>
    );
};
