import React, {
  HTMLProps,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from "react";
import css from "./Splitter.module.css";
import DomUtils from "../../utils/DomUtils";

type SplitterPanelProps = {
  minSize?: number;
  size?: number;
  children: ReactNode;
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

const SplitterComponent: React.FC<SplitterProps> = ({
  children,
  layout = "horizontal",
  gutterHeight = 24,
  gutterWidth = 4,
  className,
  ...otherProps
}) => {
  const typedChildren = children as ReactElement<SplitterPanelProps>[];
  const [panelSizes, setPanelSizes] = useState<any>([]);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const gutterRefs = useRef<Record<number, HTMLElement> | any>({});
  const gutterRef = useRef<HTMLElement | null>(null);
  const size = useRef<number | null>(null);
  const startPos = useRef<number | null>(null);
  const prevPanelElement = useRef<(HTMLElement & Element) | null | undefined>(
    null
  );
  const nextPanelElement = useRef<(HTMLElement & Element) | null | undefined>(
    null
  );
  const prevPanelSize = useRef<number | null>(null);
  const nextPanelSize = useRef<number | null>(null);
  const prevPanelSizeNew = useRef<number | null>(null);
  const nextPanelSizeNew = useRef<number | null>(null);
  const prevPanelIndex = useRef<number | null>(null);

  const childrenLength = (children && typedChildren.length) || 1;
  const isHorizontal = layout === "horizontal";

  const getPanelSize = (sizes, index) =>
    index in sizes
      ? sizes[index]
      : (children &&
          ([].concat(typedChildren as any)[index] as any).props.size) ||
        100 / childrenLength;
  const resizeListener = (e) => {
    e.preventDefault();
    onResize(e as any);
  };
  const upListener = () => {
    onResizeEnd();
    unbindMouseListeners();
  };
  const bindMouseListeners = () => {
    document.addEventListener("mousemove", resizeListener);
    document.addEventListener("mouseup", upListener);
  };

  const unbindMouseListeners = () => {
    document.removeEventListener("mousemove", resizeListener);
    document.removeEventListener("mouseup", upListener);
  };

  const onResizeStart = (event: TouchEvent & MouseEvent, index) => {
    gutterRef.current = gutterRefs.current[index];
    const pageX =
      event.type === "touchstart" ? event.touches[0].pageX : event.pageX;
    const pageY =
      event.type === "touchstart" ? event.touches[0].pageY : event.pageY;

    size.current = isHorizontal
      ? DomUtils.getWidth(elementRef.current as HTMLElement)
      : DomUtils.getHeight(elementRef.current as HTMLElement);
    startPos.current = isHorizontal ? pageX : pageY;
    prevPanelElement.current = gutterRef.current
      ?.previousElementSibling as HTMLElement;
    nextPanelElement.current = gutterRef.current
      ?.nextElementSibling as HTMLElement;
    prevPanelSize.current =
      (100 *
        (isHorizontal
          ? DomUtils.getOuterWidth(prevPanelElement.current as HTMLElement)
          : DomUtils.getOuterHeight(prevPanelElement.current as HTMLElement))) /
      size.current!;
    nextPanelSizeNew.current = prevPanelSize.current;
    nextPanelSize.current =
      (100 *
        (isHorizontal
          ? DomUtils.getOuterWidth(nextPanelElement.current as HTMLElement)
          : DomUtils.getOuterHeight(nextPanelElement.current as HTMLElement))) /
      size.current!;
    nextPanelSizeNew.current = nextPanelSize.current;
    prevPanelIndex.current = index;
  };

  const onResize = (event: TouchEvent & MouseEvent) => {
    let newPos;
    const pageX =
      event.type === "touchstart" ? event.touches[0].pageX : event.pageX;
    const pageY =
      event.type === "touchstart" ? event.touches[0].pageY : event.pageY;
    if (isHorizontal) {
      newPos =
        (pageX * 100) / size.current! -
        (startPos.current! * 100) / size.current!;
    } else {
      newPos =
        (pageY * 100) / size.current! -
        (startPos.current! * 100) / size.current!;
    }

    const newPrevPanelSize = prevPanelSize.current + newPos;
    const newNextPanelSize = nextPanelSize.current! - newPos;

    if (validateResize(newPrevPanelSize, newNextPanelSize)) {
      prevPanelSizeNew.current = newPrevPanelSize;
      nextPanelSizeNew.current = newNextPanelSize;
      prevPanelElement.current!.style.flexBasis = `calc(${newPrevPanelSize}% - ${
        typedChildren.length - 1
      } * ${gutterWidth}px)`;
      nextPanelElement.current!.style.flexBasis = `calc(${newNextPanelSize}% - ${
        typedChildren.length - 1
      } * ${gutterWidth}px)`;
    }
  };

  const onResizeEnd = () => {
    setPanelSizes((prev) => {
      const sizes: any = [];
      for (let i = 0; i < typedChildren.length; i++)
        sizes[i] = getPanelSize(prev, i);
      sizes[prevPanelIndex.current!] = prevPanelSizeNew.current;
      sizes[prevPanelIndex.current! + 1] = nextPanelSizeNew.current;
      return sizes;
    });
    clear();
  };

  const onGutterMouseDown = (event, index) => {
    event.preventDefault();
    onResizeStart(event, index);
    bindMouseListeners();
  };

  const onTouchStart = (event, index) => {
    onResizeStart(event, index);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
  };

  const onTouchMove = (event) => {
    onResize(event);
  };

  const onTouchEnd = () => {
    onResizeEnd();
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
  };

  const validateResize = (newPrevPanelSize, newNextPanelSize) => {
    if (newPrevPanelSize > 100 || newPrevPanelSize < 0) return false;
    if (newNextPanelSize > 100 || newNextPanelSize < 0) return false;
    if (
      typedChildren[prevPanelIndex.current!].props.minSize! > newPrevPanelSize
    )
      return false;
    if (
      typedChildren[prevPanelIndex.current! + 1].props.minSize! >
      newNextPanelSize
    )
      return false;
    return true;
  };

  const clear = () => {
    size.current = null;
    startPos.current = null;
    prevPanelElement.current = null;
    nextPanelElement.current = null;
    prevPanelSize.current = null;
    prevPanelSizeNew.current = null;
    nextPanelSize.current = null;
    nextPanelSizeNew.current = null;
    prevPanelIndex.current = null;
  };

  const createPanel = (panel: ReactElement, index) => {
    const style = isHorizontal
      ? { width: `${gutterWidth}px` }
      : { height: `${gutterWidth}px` };
    const styleGutterHandle = isHorizontal
      ? {
          height: gutterHeight,
          width: "100%",
        }
      : {
          width: gutterHeight,
          height: "100%",
        };
    const gutter = index !== typedChildren.length - 1 && (
      <div
        className={`${css["splitter-gutter"]} ${
          isHorizontal ? "" : css["splitter-gutter_vertical"]
        }`}
        ref={(r) => (gutterRefs.current[index] = r)}
        style={style}
        onMouseDown={(e) => onGutterMouseDown(e, index)}
        onTouchStart={(e) => onTouchStart(e, index)}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={css["splitter-gutter-handle"]}
          style={styleGutterHandle}
        />
      </div>
    );
    const flexBasis = `calc(${getPanelSize(panelSizes, index)}% - ${
      childrenLength - 1
    } * ${gutterWidth}px)`;
    return (
      <React.Fragment>
        <div
          key={index}
          style={{ flexBasis }}
          className={css["splitter-panel"]}
        >
          {panel.props.children}
        </div>
        {gutter}
      </React.Fragment>
    );
  };

  const createPanels = () => {
    return React.Children.map(children, createPanel);
  };

  const panels = createPanels();
  const cn = `${css["splitter"]} ${css[`splitter-${layout}`]} ${className}`;

  return (
    <div ref={elementRef} className={cn} {...otherProps}>
      {panels}
    </div>
  );
};

type CompounterComponent = typeof SplitterComponent & {
  Panel: typeof SplitterPanel;
};

const Splitter = SplitterComponent as CompounterComponent;

Splitter.Panel = SplitterPanel;

export default Splitter;
