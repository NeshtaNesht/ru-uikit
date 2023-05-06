import React, { HTMLProps, ReactNode } from "react";
import cx from "clsx";
import css from "./Flexbox.module.css";

type FlexboxProps = {
  justify?:
    | "space-between"
    | "space-around"
    | "flex-start"
    | "flex-end"
    | "center";
  align?: "center" | "flex-start" | "flex-end" | "baseline";
  layout?: "vertical" | "horizontal";
  width?: string;
  height?: string;
  gap?: number;
  children: ReactNode;
} & HTMLProps<HTMLDivElement>;

const Flexbox: React.FC<FlexboxProps> = ({
  children,
  justify,
  align,
  layout,
  className,
  width,
  height,
  style,
  gap,
  ...other
}) => {
  const styles = { ...style, width, height, gap };
  return (
    <div
      className={cx(css["flexbox"], className, {
        [css["justify-spb"]]: justify === "space-between",
        [css["justify-spa"]]: justify === "space-around",
        [css["justify-fle"]]: justify === "flex-end",
        [css["justify-c"]]: justify === "center",
        [css["layout-v"]]: layout === "vertical",
        [css["align-c"]]: align === "center",
        [css["align-fs"]]: align === "flex-start",
        [css["align-fe"]]: align === "flex-end",
      })}
      style={styles}
      {...other}
    >
      {children}
    </div>
  );
};

export type { FlexboxProps };
export default Flexbox;
