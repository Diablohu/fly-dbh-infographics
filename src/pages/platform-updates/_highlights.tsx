import {
    type CSSProperties,
    type FC,
    type JSX,
    type ReactNode,
    type DetailedHTMLProps,
    type HTMLAttributes,
} from "react";
import classNames from "classnames";
import numeral from "numeral";
import dayjs from "dayjs";

import useViewType from "../_use-view-type";

import Cell, { type CellProps } from "./_components/cell";

import styles from "./_highlights.module.less";

// ============================================================================

const Highlights: FC<
    {
        width?: "narrow" | "wide";
        height?: "short" | "tall";
        title: "msfs2020" | "msfs2024";
        updates?: {
            type: "su" | "aau";
            number: number;
        }[];
        itemGroups: {
            name: string;
            title: string;
            items: ({
                rowSpan?: number;
                colSpan?: number;
                columnSpan?: number;
            } & CellProps)[];
            gridTemplate?: {
                rows?: string;
                columns?: string;
            };
        }[];
        isBeta?: boolean;
    } & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> = ({
    width,
    height,
    title,
    updates,
    itemGroups,
    isBeta = false,
    ...props
}) => {
    const [viewType] = useViewType();

    return (
        <section
            className={classNames([
                styles["highlights"],
                {
                    [styles[`is-view-${viewType}`]]: !!viewType,
                },
            ])}
            data-view={viewType}
            data-title={title}
            {...props}
        >
            <section className={styles["logo"]}>
                <span className={styles["top"]} />
                <span className={styles["bottom"]}>
                    <span className={styles["wrapper"]}>
                        <span className={styles["title"]}>
                            {title === "msfs2020"
                                ? "2020"
                                : title === "msfs2024"
                                  ? "2024"
                                  : null}
                        </span>
                        {Array.isArray(updates) && updates.length > 0 && (
                            <span className={styles["updates"]}>
                                {updates.map(({ type, number }, index) => (
                                    <span
                                        key={index}
                                        className={styles["update"]}
                                    >
                                        <small>
                                            {type === "su" &&
                                            updates.length === 1
                                                ? "SIM UPDATE"
                                                : type.toUpperCase()}
                                        </small>
                                        {numeral(number).format("00")}
                                    </span>
                                ))}
                            </span>
                        )}
                    </span>
                </span>
            </section>
            <section className={styles["body"]}>
                {itemGroups.map((group, index) => (
                    <section
                        key={index}
                        className={styles["group"]}
                        data-name={group.name}
                        style={{
                            gridArea: group.name,
                        }}
                    >
                        <h2 className={styles["title"]}>{group.title}</h2>
                        <section
                            className={styles["grid"]}
                            style={{
                                gridTemplateRows: group.gridTemplate?.rows,
                                gridTemplateColumns:
                                    group.gridTemplate?.columns,
                            }}
                        >
                            {group.items.map(
                                (
                                    {
                                        rowSpan,
                                        colSpan,
                                        columnSpan,
                                        style,
                                        ...item
                                    },
                                    itemIndex,
                                ) => (
                                    <Cell
                                        className={classNames([styles["cell"]])}
                                        key={itemIndex}
                                        style={
                                            {
                                                gridColumn: colSpan
                                                    ? `span ${colSpan}`
                                                    : columnSpan
                                                      ? `span ${columnSpan}`
                                                      : undefined,
                                                gridRow: rowSpan
                                                    ? `span ${rowSpan}`
                                                    : undefined,
                                                ...style,
                                            } as Record<string, string>
                                        }
                                        {...item}
                                    />
                                ),
                            )}
                        </section>
                    </section>
                ))}
            </section>
            <section className={styles["footer"]}>
                {dayjs().format("YYYY-MM-DD")} | fly-dbh.com
            </section>
        </section>
    );
};

export default Highlights;
