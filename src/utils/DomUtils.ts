export default {
  getOuterWidth(element?: HTMLElement) {
    if (element) {
      let width = element.getBoundingClientRect().width || element.offsetWidth;
      const style = window.getComputedStyle(element);
      width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      return width;
    }
    return 0;
  },
  getOuterHeight(element?: HTMLElement) {
    if (element) {
      let height =
        element.getBoundingClientRect().height || element.offsetHeight;
      const style = window.getComputedStyle(element);
      height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      return height;
    }
    return 0;
  },
  getWidth(element?: HTMLElement) {
    if (element) {
      let width = element.offsetWidth;
      const style = window.getComputedStyle(element);
      width -=
        parseFloat(style.paddingLeft) +
        parseFloat(style.paddingRight) +
        parseFloat(style.borderLeftWidth) +
        parseFloat(style.borderRightWidth);
      return width;
    }
    return 0;
  },
  getHeight(element?: HTMLElement) {
    if (element) {
      let height = element.offsetHeight;
      const style = window.getComputedStyle(element);
      height -=
        parseFloat(style.paddingTop) +
        parseFloat(style.paddingBottom) +
        parseFloat(style.borderTopWidth) +
        parseFloat(style.borderBottomWidth);
      return height;
    }
    return 0;
  },
  hasClass(element?: HTMLElement, className?: string) {
    if (element) {
      if (element.classList) return element.classList.contains(className!);
    }
    return false;
  },
};
