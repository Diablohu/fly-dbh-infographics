import {
    Fragment,
    type DetailedHTMLProps,
    type HTMLAttributes,
    type CSSProperties,
    type ReactNode,
    type FC,
} from "react";
import classNames from "classnames";

import useViewType from "../../_use-view-type";

import styles from "./cell.module.less";

// ============================================================================

export type CellProps = {
    /** 标题 */
    title: string | string[];
    /** 细节信息 */
    infos?: Array<
        | string
        | {
              type:
                  | "fix"
                  | "new"
                  | "implement"
                  | "change"
                  | "remove"
                  | "list-item";
              content: string;
          }
    >;
    background?: {
        name?: string;
        mask?: boolean;
        /** CSS Style: background-size */
        size?: CSSProperties["backgroundSize"];
        /** CSS Style: background-position */
        position?: CSSProperties["backgroundPosition"];
    };
    // img?: string;
    // mask?: boolean;
    textSize?: "lg" | "md" | "sm";
    /** 行数 */
    rowSpan?: number;
    /** 列数 */
    columnSpan?: number;
    // type?: "info" | "center";
    // infoCell?: boolean;
    // lightBorder?: boolean;
    style?: CSSProperties & Record<string, string>;
    // extra?: ReactNode;
    /** 开发者 */
    // developers?: string[];
    bgMaskOrientation?: "horizontal" | "vertical";
    delayed?: boolean;
    implemented?: false;
    // cells?: ItemCellType[];
} & Partial<
    Omit<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        "title"
    >
>;

// Functional Component =======================================================

const Cell: FC<CellProps> = ({
    className,

    title,
    infos,
    background = {},

    textSize,
    bgMaskOrientation = "vertical",

    children,
    style = {},

    ...props
}) => {
    const [viewType] = useViewType();
    return (
        <div
            className={classNames([
                className,
                styles["cell"],
                {
                    [styles[`is-view-${viewType}`]]: !!viewType,

                    [styles[`mod-text-size-${textSize}`]]: !!textSize,
                    [styles[`mod-bg-mask-orientation-${bgMaskOrientation}`]]:
                        !!bgMaskOrientation,
                    // [styles[`mod-align-${align}`]]: !!align,
                    // [styles[`mod-vertical-align-${verticalAlign}`]]:
                    //     !!verticalAlign,
                },
            ])}
            style={{
                backgroundImage: background.name
                    ? `url(/static-images/${background.name})`
                    : undefined,
                backgroundSize: background.size,
                backgroundPosition: background.position,
                ...style,
            }}
            {...props}
        >
            {children ?? (
                <>
                    <strong>
                        {Array.isArray(title)
                            ? title.map((line, i, arr) => (
                                  <Fragment key={i}>
                                      {line}
                                      {i < arr.length - 1 ? <br /> : null}
                                  </Fragment>
                              ))
                            : title}
                    </strong>
                    {infos?.map((info, index) => {
                        if (
                            info &&
                            typeof info === "object" &&
                            "content" in info
                        ) {
                            return (
                                <span key={index}>
                                    <CellTag type={info.type}></CellTag>
                                    {info.content}
                                </span>
                            );
                        }
                        return <span key={index}>{info}</span>;
                    })}
                </>
            )}
            {/* {extra} */}
        </div>
    );
};

export default Cell;

// ============================================================================

export const CellTag: FC<
    {
        type: Exclude<Required<CellProps>["infos"][0], ReactNode>["type"];
    } & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
> = ({ className, type = "new", children, ...props }) => {
    return (
        <small
            className={classNames([
                className,
                styles[`cell-tag`],
                `is-type-${type}`,
                {
                    [styles[`is-type-${type}`]]: !!type,
                },
            ])}
            {...props}
        >
            {children ??
                (type === "fix"
                    ? "修正"
                    : type === "new"
                      ? "新"
                      : type === "implement"
                        ? "实装"
                        : type === "change"
                          ? "变更"
                          : type === "remove"
                            ? "移除"
                            : type)}
        </small>
    );
};
