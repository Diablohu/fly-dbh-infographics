import {
    type CSSProperties,
    type FC,
    type JSX,
    type ReactNode,
    type DetailedHTMLProps,
    type HTMLAttributes,
} from "react";
import classNames from "classnames";

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
            items: CellProps[];
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
            {...props}
        >
            <section className={styles["header"]}></section>
            <section className={styles["body"]}>
                {itemGroups.map((group, index) => (
                    <section
                        key={index}
                        className={styles["group"]}
                        data-name={group.name}
                    >
                        <h2 className={styles["title"]}>{group.title}</h2>
                        <section className={styles["grid"]}>
                            {group.items.map((item, itemIndex) => (
                                <Cell key={itemIndex} {...item} />
                            ))}
                        </section>
                    </section>
                ))}
            </section>
            <section className={styles["footer"]}></section>
        </section>
    );
};

export default Highlights;
