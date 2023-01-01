import React, { Component, ReactElement } from 'react';
import OriginalWinBox from 'winbox/src/js/winbox';
import 'winbox/dist/css/winbox.min.css';
import ReactDOM from 'react-dom';

export type WinBoxPropType = {
  title?: string
  /** 
   * Icon supports both native image urls and React package resources:
   *
   * Example:
   * ```
   * import icon from './icon.jpg';
   * 
   * <WinBox icon={icon} {...otherProps} />
   * ```
   */
  icon?: string
  id?: string
  children?: ReactElement | ReactElement[] | null
  /**
   * When you use this, the children elements will be ignored.
   */
  url?: string

  noAnimation?: boolean,
  noShadow?: boolean,
  noHeader?: boolean,
  noMin?: boolean,
  noMax?: boolean,
  noFull?: boolean,
  noClose?: boolean,
  noResize?: boolean,
  noMove?: boolean,
  modal?: boolean,
  hide?: boolean,

  index?: number,
  border?: number,
  background?: string,
  /** @deprecated this does not work since v1.5.0 */
  splitscreen?: boolean,

  max?: boolean,
  min?: boolean,
  fullscreen?: boolean,

  x?: string | number | 'center' | 'right',
  y?: string | number | 'center' | 'bottom',
  /** For dynamical changing, only supports numbers (px) */
  top?: string | number,
  /** For dynamical changing, only supports numbers (px) */
  bottom?: string | number,
  /** For dynamical changing, only supports numbers (px) */
  left?: string | number,
  /** For dynamical changing, only supports numbers (px) */
  right?: string | number,
  /** supports units "px" and "%" */
  height?: string | number,
  /** supports units "px" and "%" */
  width?: string | number,

  /**
   * This callback is called BEFORE the winbox goes to close process. So if you want to destroy the React WinBox component in it, be sure to wrap destroy actions within `setTimeout` so that they occur after the winbox.js DOM is truly closed，e.g. `setTimeout(() => setState({showWindow: false}))`
   *
   * see the following document for more detail about the argument and the return value.
   * @see https://github.com/nextapps-de/winbox
   * @param force Whether you should not abort the winbox to close. If this is true, you MUST return false, or some problems will happen.
   * @return noDefaultClose - true if the winbox does not need the default close process, for example, when it needs a confirmation to close instead of being closed suddenly.
   */
  onClose?: (force: boolean) => boolean | undefined | void,
  onMove?: (x: number, y: number) => any,
  onResize?: (width: number, height: number) => any,
  onBlur?: () => any,
  onFocus?: () => any,
  /** @deprecated use onClose instead */
  onclose?: (force: boolean) => boolean | undefined | void,
  /** @deprecated use onMove instead */
  onmove?: (x: number, y: number) => any,
  /** @deprecated use onMove instead */
  onresize?: (width: number, height: number) => any,
  /** @deprecated use onBlur instead */
  onblur?: () => any,
  /** @deprecated use onFocus instead */
  onfocus?: () => any,

  /** The `no-xxx` classes that winbox.js already appointed can not assign here, use special props instead, e.g. class `no-resize` to prop `noResize={true}` */
  className?: string,

  // below is from v0.2.6
  /** @deprecated Autosize the window for content. In React, that may be impossible, but the param is retained conservatively */
  autosize?: boolean,
  /** supports units "px" and "%". For dynamical changing, only supports numbers (px) */
  minWidth?: number | string,
  /** supports units "px" and "%". For dynamical changing, only supports numbers (px) */
  minHeight?: number | string,
  /** supports units "px" and "%". For dynamical changing, only supports numbers (px) */
  maxWidth?: number | string,
  /** supports units "px" and "%". For dynamical changing, only supports numbers (px) */
  maxHeight?: number | string,
  /** Callback triggered when the winbox element is being created */
  onCreate?: (options: any) => any,
  onFullscreen?: () => any,
  onMinimize?: () => any,
  onMaximize?: () => any,
  onRestore?: () => any,
  onHide?: () => any,
  onShow?: () => any,
}

type WinBoxState = {
  closed: boolean
}

/**
 * # WinBox React Component
 *
 * @see https://github.com/rickonono3/react-winbox
 * @see https://github.com/nextapps-de/winbox
 */
class WinBox extends Component<WinBoxPropType, WinBoxState> {
  public winBoxObj?: OriginalWinBox;
  private cdmCount = 0;
  private checkReactVersionGE18 = (): boolean => {
    const a = parseInt(React.version.split('.')[0]);
    return (a >= 18);
  }

  constructor(props) {
    super(props);
    this.state = {
      closed: false,
    };
    this.winBoxObj = undefined;
  }

  componentDidMount() {
    this.cdmCount++;
    if (this.checkReactVersionGE18()) { // strict mode safe
      if (this.cdmCount >= 2) return;
    }
    try {
      if (this.props.id !== undefined && this.props.id !== null && document.getElementById(this.props.id))
        throw 'duplicated window id';
      this.winBoxObj = OriginalWinBox.new({
        width: 300,
        height: 200,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        hidden: this.props.hide,
        // 👆default values
        ...this.props,
        // 👇override values
        minwidth: this.props.minWidth ?? 150,
        maxwidth: this.props.maxWidth ?? 2147483647,
        minheight: this.props.minHeight ?? 35,
        maxheight: this.props.maxHeight ?? 2147483647,
        max: false, // wait for creating
        min: false, // wait for creating
        fullscreen: false, // wait for creating
        class: `${this.props.className ?? ''}`,
        onclose: (force?: boolean) => {
          if (this.props.onClose?.(force ?? false)) {
            return true;
          } else if (this.props.onclose?.(force ?? false)) {
            return true;
          }
          this.handleClose(); // only when false, run close process.
          return false;
        },
        onmove: this.props.onMove ?? this.props.onmove,
        onresize: this.props.onResize ?? this.props.onresize,
        onblur: this.props.onBlur ?? this.props.onblur,
        onfocus: this.props.onFocus ?? this.props.onfocus,
        oncreate: this.props.onCreate,
        onfullscreen: this.props.onFullscreen,
        onminimize: this.props.onMinimize,
        onmaximize: this.props.onMaximize,
        onrestore: this.props.onRestore,
        onhide: this.props.onHide,
        onshow: this.props.onShow,
      });
      setTimeout(() => {
        this.forceUpdate();
      })
    } catch (e) {
      console.error(e);
      //this.winBoxObj?.close(true);
      //this.setState({ closed: true });
    }
  }

  componentDidUpdate(prevProps: Readonly<WinBoxPropType>, prevState: Readonly<WinBoxState>) {
    this.maintain({ prevProps });
  }

  componentWillUnmount() {
    try {
      if (this.checkReactVersionGE18()) { // strict mode safe (depends on the timeout of 100ms, in low performance enviroments may crash.)
        if (this.cdmCount <= 1) {
          setTimeout(() => {
            if (this.cdmCount <= 1) {
              this.winBoxObj?.close(true);
            }
          }, 100);
        } else {
          this.winBoxObj?.close(true);
        }
      } else { // less than 18, keep old code
        this.winBoxObj?.close(true);
      }
    } catch (ignored) { }
  }

  public forceUpdate(callback?: () => void): void {
    try {
      this.maintain({ force: true });
    } catch (e) {
      console.error(e);
      //this.winBoxObj?.close(true);
      //this.setState({ closed: true });
    }

    super.forceUpdate(callback);
  }

  public getId = (): string | undefined => (this.winBoxObj?.id);

  public getIndex = (): number | undefined => (this.winBoxObj?.index);

  public getPosition = (): { x: number, y: number } | undefined => {
    if (this.winBoxObj) {
      return {
        x: this.winBoxObj.x,
        y: this.winBoxObj.y,
      };
    }
    return undefined;
  }

  public getSize = (): { width: number, height: number } | undefined => {
    if (this.winBoxObj) {
      return {
        width: this.winBoxObj.width,
        height: this.winBoxObj.height,
      };
    }
    return undefined;
  }

  public getSizeLimit = (): { minWidth: number, minHeight: number, maxWidth: number, maxHeight: number } | undefined => {
    if (this.winBoxObj) {
      return {
        minWidth: this.winBoxObj.minwidth,
        minHeight: this.winBoxObj.minheight,
        maxWidth: this.winBoxObj.maxwidth,
        maxHeight: this.winBoxObj.maxheight,
      };
    }
    return undefined;
  }

  public getViewportBoundary = (): { top: number, right: number, bottom: number, left: number } | undefined => {
    if (this.winBoxObj) {
      return {
        top: this.winBoxObj.top,
        right: this.winBoxObj.right,
        bottom: this.winBoxObj.bottom,
        left: this.winBoxObj.left,
      };
    }
    return undefined;
  }

  public isFocused = (): boolean => (this.winBoxObj?.focused ?? false);

  public isHidden = (): boolean => (this.winBoxObj?.hidden ?? false);

  public isMax = (): boolean => (this.winBoxObj?.max ?? false);

  public isMin = (): boolean => (this.winBoxObj?.min ?? false);

  public isFullscreen = (): boolean => (this.winBoxObj?.full ?? false);

  public isClosed = (): boolean => (this.state.closed);

  public focus = (): void => { this.winBoxObj?.focus() }

  public blur = (): void => { this.winBoxObj?.blur() }

  /** We suggest using `min` prop instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
  public minimize = (): void => { this.winBoxObj?.minimize() }

  /** We suggest using `max` prop instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
  public maximize = (): void => { this.winBoxObj?.maximize() }

  /** We suggest using `fullscreen` prop instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
  public fullscreen = (): void => { this.winBoxObj?.fullscreen() }

  /** We suggest using `max`/`min`/`fullscreen` props instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
  public restore = (): void => { this.winBoxObj?.restore() }

  /** We suggest using `hide` props instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
  public hide = (): void => { this.winBoxObj?.hide() }

  /** We suggest using `hide` props instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
  public show = (): void => { this.winBoxObj?.show() }

  maintainStyle = () => {
    if (!this.winBoxObj) return;
    this.winBoxObj[this.props.noAnimation ? 'addClass' : 'removeClass']('no-animation');
    this.winBoxObj[this.props.noClose ? 'addClass' : 'removeClass']('no-close');
    this.winBoxObj[this.props.noFull ? 'addClass' : 'removeClass']('no-full');
    this.winBoxObj[this.props.noMin ? 'addClass' : 'removeClass']('no-min');
    this.winBoxObj[this.props.noMax ? 'addClass' : 'removeClass']('no-max');
    this.winBoxObj[this.props.noMove ? 'addClass' : 'removeClass']('no-move');
    this.winBoxObj[this.props.noHeader ? 'addClass' : 'removeClass']('no-header');
    this.winBoxObj[this.props.noResize ? 'addClass' : 'removeClass']('no-resize');
    this.winBoxObj[this.props.noShadow ? 'addClass' : 'removeClass']('no-shadow');
    this.winBoxObj[this.props.modal ? 'addClass' : 'removeClass']('modal');
    this.winBoxObj[this.props.hide ? 'addClass' : 'removeClass']('hide');
  };

  maintain = (args?: { force?: boolean, prevProps?: WinBoxPropType }) => {
    if (!this.winBoxObj) return;
    const { force, prevProps } = args ?? {};
    if (force || prevProps?.title !== this.props.title) {
      if (typeof this.props.title === 'string')
        this.winBoxObj.setTitle(this.props.title);
    }
    if (force || prevProps?.icon !== this.props.icon) {
      if (typeof this.props.icon === 'string')
        this.winBoxObj.setIcon(this.props.icon);
    }
    if (force || prevProps?.url !== this.props.url) {
      if (this.props.url != undefined)
        this.winBoxObj.setUrl(this.props.url);
    }
    if (force || prevProps?.background !== this.props.background) {
      if (this.props.background != undefined)
        this.winBoxObj.setBackground(this.props.background);
    }
    if (force
      || prevProps?.minWidth !== this.props.minWidth
      || prevProps?.minHeight !== this.props.minHeight
      || prevProps?.maxWidth !== this.props.maxWidth
      || prevProps?.maxHeight !== this.props.maxHeight
    ) {
      const minWidth = this.props.minWidth ?? this.winBoxObj.minwidth;
      const minHeight = this.props.minHeight ?? this.winBoxObj.minheight;
      const maxWidth = this.props.maxWidth ?? this.winBoxObj.maxwidth;
      const maxHeight = this.props.maxHeight ?? this.winBoxObj.maxheight;
      this.winBoxObj.minwidth = minWidth;
      this.winBoxObj.minheight = minHeight;
      this.winBoxObj.maxwidth = maxWidth;
      this.winBoxObj.maxheight = maxHeight;
    }
    if (force
      || prevProps?.width !== this.props.width
      || prevProps?.height !== this.props.height
    ) {
      const width = this.props.width ?? this.winBoxObj.width;
      const height = this.props.height ?? this.winBoxObj.height;
      // use function params rather than assigning fields directly to avoid the 'just support numbers' feature
      // see https://github.com/nextapps-de/winbox#custom-position--size
      this.winBoxObj.resize(width, height);
    }
    if (force
      || prevProps?.x !== this.props.x
      || prevProps?.y !== this.props.y
    ) {
      const x = this.props.x ?? this.winBoxObj.x;
      const y = this.props.y ?? this.winBoxObj.y;
      // use function params rather than assigning fields directly to avoid the 'just support numbers' feature
      // see https://github.com/nextapps-de/winbox#custom-position--size
      this.winBoxObj.move(x, y);
    }
    if (force
      || prevProps?.top !== this.props.top
      || prevProps?.right !== this.props.right
      || prevProps?.bottom !== this.props.bottom
      || prevProps?.left !== this.props.left
    ) {
      this.winBoxObj.top = this.props.top ?? this.winBoxObj.top;
      this.winBoxObj.right = this.props.right ?? this.winBoxObj.right;
      this.winBoxObj.bottom = this.props.bottom ?? this.winBoxObj.bottom;
      this.winBoxObj.left = this.props.left ?? this.winBoxObj.left;
      this.winBoxObj.move();
    }
    if (force || prevProps?.fullscreen !== this.props.fullscreen) {
      if (this.props.fullscreen != undefined)
        this.winBoxObj.fullscreen(this.props.fullscreen);
    }
    if (force || prevProps?.min !== this.props.min) {
      if (this.props.min != undefined)
        this.winBoxObj.minimize(this.props.min);
    }
    if (force || prevProps?.max !== this.props.max) {
      if (this.props.max != undefined)
        this.winBoxObj.maximize(this.props.max);
    }
    if (force || prevProps?.className !== this.props.className) {
      if (prevProps?.className != undefined) {
        const classes = prevProps.className.replaceAll(/\s+/g, ' ').split(' ').filter(c => c != '');
        for (const c of classes) {
          if (this.winBoxObj.hasClass(c)) {
            this.winBoxObj.removeClass(c);
          }
        }
      }
      if (this.props.className != undefined) {
        const classes = this.props.className.replaceAll(/\s+/g, ' ').split(' ').filter(c => c != '');
        for (const c of classes) {
          if (!this.winBoxObj.hasClass(c)) {
            this.winBoxObj.addClass(c);
          }
        }
      }
    }
    this.maintainStyle();
  };

  handleClose = () => {
    this.winBoxObj = undefined;
    this.setState({ closed: true });
  };

  render() {
    if (Object.keys(this.props).indexOf('url') !== -1 && this.props.url)
      return null; // do nothing if url is set.
    if (!this.winBoxObj || !this.winBoxObj.body)
      return null;
    return ReactDOM.createPortal(<>{this.props.children}</>, this.winBoxObj.body);
  }
}

export default WinBox;