import { ReactNode, CSSProperties, Fragment } from 'react';
import classNames from 'classnames';
import './section.scss';
import './theme/theme-default.scss';
import './theme/theme-white.scss';

export enum SectionLayoutType {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

export enum SectionTheme {
    Default = 'default',
    White = 'white',
}

export enum SectionAlignment {
    Left = 'left',
    Right = 'right',
    Center = 'center',
}

export interface ISectionProps {
    layout?: SectionLayoutType;
    theme?: SectionTheme;
    totalFields?: number;
    autoSpacing?: boolean;
    align?: SectionAlignment;
    width?: string;
    className?: string;
    style?: CSSProperties;
    subSection?: boolean;
    subSectionBorder?: boolean;
    formField?: boolean;
    bordered?: boolean;
    borderRadius?: boolean;
    borderLeft?: boolean;
    borderRight?: boolean;
    borderTop?: boolean;
    borderBottom?: boolean;
    padding?: boolean;
    children?: any;
}

export const Section = ({
    layout = SectionLayoutType.Vertical,
    theme,
    totalFields,
    autoSpacing,
    align,
    width,
    className,
    style,
    subSection,
    subSectionBorder,
    formField,
    bordered,
    borderRadius,
    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
    padding,
    children,
}: ISectionProps) => {
    layout = layout || SectionLayoutType.Vertical;
    style = style || {};
    style = width ? { ...style, width: width } : style;

    return (
        <div
            className={classNames(
                'section',
                layout ? `layout-${layout}` : '',
                totalFields ? `field-${totalFields}` : '',
                autoSpacing ? `auto-spacing` : '',
                theme ? `theme theme-${theme}` : '',
                align || '',
                bordered ? `bordered` : '',
                borderRadius ? `border-radius` : '',
                borderLeft ? `border-left` : '',
                borderRight ? `border-right` : '',
                borderTop ? `border-top` : '',
                borderBottom ? `border-bottom` : '',
                subSection ? `sub-section` : '',
                subSectionBorder ? `sub-section-border` : '',
                formField ? `form-field` : '',
                padding ? `padding` : '',
                className,
            )}
            style={style}
        >
            {children
                ? children.map
                    ? children.map((child: any, index: number) => {
                          return wrapSectionChildOrReturn(
                              index.toString(),
                              child,
                              autoSpacing,
                          );
                      })
                    : wrapSectionChildOrReturn(
                          children.props?.name,
                          children,
                          autoSpacing,
                      )
                : null}
        </div>
    );
};

const wrapSectionChildOrReturn = (
    key: string,
    child: any,
    autoSpacing?: boolean,
) => {
    return !autoSpacing ? (
        <Fragment key={key}>{child}</Fragment>
    ) : (
        <div key={key} className="section-item">
            {child}
        </div>
    );
};
