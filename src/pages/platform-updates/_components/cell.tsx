import {
    Fragment,
    useMemo,
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
        image?: ImageMetadata;
        name?: string;
        /** CSS Style: background-size */
        size?: CSSProperties["backgroundSize"];
        /** CSS Style: background-position */
        position?: CSSProperties["backgroundPosition"];
    };
    mask?: {
        orientation?: "horizontal" | "vertical";
        opacity?: number;
    };
    // mask?: boolean;
    textSize?: "lg" | "md" | "sm";
    // type?: "info" | "center";
    // infoCell?: boolean;
    // lightBorder?: boolean;
    style?: CSSProperties & Record<string, string>;
    // extra?: ReactNode;
    /** 开发者 */
    // developers?: string[];
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

    textSize = "md",
    mask,

    style: _style = {},
    children,

    ...props
}) => {
    const [viewType] = useViewType();
    const maskOrientation = mask?.orientation ?? "vertical";
    const style = useMemo(() => {
        const style = _style as Record<string, string>;
        if (typeof mask?.opacity === "number")
            style["--background-mask-opacity"] = `${mask?.opacity}`;
        return style;
    }, [_style, mask]);
    return (
        <div
            className={classNames([
                className,
                styles["cell"],
                {
                    [styles[`is-view-${viewType}`]]: !!viewType,

                    [styles[`mod-text-size-${textSize}`]]: !!textSize,
                    [styles[`mod-bg-mask-orientation-${maskOrientation}`]]:
                        !!maskOrientation,
                    // [styles[`mod-align-${align}`]]: !!align,
                    // [styles[`mod-vertical-align-${verticalAlign}`]]:
                    //     !!verticalAlign,
                },
            ])}
            data-view={viewType}
            data-text-size={textSize}
            data-mask-orientation={maskOrientation}
            style={style}
            {...props}
        >
            {children ?? (
                <>
                    <strong className={styles["title"]}>
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
                                <p key={index} data-type={info.type}>
                                    <Tag type={info.type}></Tag>
                                    {info.content}
                                </p>
                            );
                        }
                        return <p key={index}>{info}</p>;
                    })}
                </>
            )}
            <span
                className={styles["background"]}
                style={{
                    backgroundImage: background.name
                        ? `url("/static-images/${background.name}")`
                        : background.image
                          ? `url("${background.image.src}")`
                          : undefined,
                    backgroundSize: background.size,
                    backgroundPosition: background.position,
                }}
            />
            <span className={styles["background-mask"]} />
            <span className={styles["view-mask-mode-overlay"]} />
            {/* {extra} */}
        </div>
    );
};

export default Cell;

// ============================================================================

export const Tag: FC<
    {
        type: Exclude<Required<CellProps>["infos"][0], ReactNode>["type"];
    } & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
> = ({ className, type = "new", children, ...props }) => {
    return (
        <small
            className={classNames([
                className,
                styles[`tag`],
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
                            : type === "list-item"
                              ? "・"
                              : null)}
        </small>
    );
};
