import React, { HTMLProps, ReactElement, ReactNode, useState } from "react";

type SplitterPanelProps = {
  minSize?: number;
  size?: number;
};

const SplitterPanel: React.FC<SplitterPanelProps> = () => {
  return null;
};

type SplitterProps = {
  layout?: "horizontal" | "vertical";
  gutterWidth?: number | string;
  gutterHeight?: number | string;
  children: ReactNode;
} & HTMLProps<HTMLDivElement>;

const Splitter: React.FC<SplitterProps> = ({
  children,
  layout = "horizontal",
  gutterHeight = 24,
  gutterWidth = 4,
  className,
}) => {
  const typedChildren = children as ReactElement<SplitterPanelProps>[];
  const [panelSizes, setPanelSizes] = useState<any>([]);
  return <div />;
};

Splitter.Panel = SplitterPanel;

export default Splitter;
