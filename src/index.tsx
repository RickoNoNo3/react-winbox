import React, {Component, ReactElement} from 'react';
import OriginalWinBox from 'winbox/src/js/winbox';
import 'winbox/dist/css/winbox.min.css';
import ReactDOM from 'react-dom';

export type WinBoxPropType = {
  title: string
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
  splitscreen?: boolean,
  background?: string,

  max?: boolean,
  min?: boolean,

  x?: string | number | 'center',
  y?: string | number | 'center',
  top?: string | number,
  bottom?: string | number,
  left?: string | number,
  right?: string | number,
  height?: string | number,
  width?: string | number,
  fullscreen?: boolean,

  /**
   * This callback is called BEFORE the winbox goes to close process. So if you want to destroy the React WinBox component in it, be sure to wrap destroy actions within `setTimeout` so that they occur after the winbox.js DOM is truly closed，e.g. `setTimeout(() => setState({showWindow: false}))`
   *
   * see the following document for more detail about the argument and the return value.
   * @see https://github.com/nextapps-de/winbox
   * @param force Whether you should not abort the winbox to close. If this is true, you MUST return false, or some problems will happen.
   * @return noDefaultClose - true if the winbox does not need the default close process, for example, when it needs a confirmation to close instead of being closed suddenly.
   */
  onclose?: (force: boolean) => boolean | undefined | void,
  onmove?: (x: number, y: number) => any,
  onresize?: (width: number, height: number) => any,
  onblur?: () => any,
  onfocus?: () => any,

  className?: string | number,
}

type WinBoxState = {
  closed: boolean
}

/**
 * # WinBox React Component
 *
 * Use refs to call focus(), isMax(), isMin(), getId(), isClosed() methods if need. But for others, use props instead of refs.
 * @see https://github.com/rickonono3/react-winbox
 * @see https://github.com/nextapps-de/winbox
 */
class WinBox extends Component<WinBoxPropType, WinBoxState> {
  public winBoxObj: OriginalWinBox;

  constructor(props) {
    super(props);
    this.state = {
      closed: false,
    };
    this.winBoxObj = undefined;
  }

  componentDidMount() {
    try {
      if (this.props.id !== undefined && this.props.id !== null && document.getElementById(this.props.id))
        throw 'duplicated window id';
      this.winBoxObj = new OriginalWinBox({
        width: 300,
        height: 200,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        ...this.props,
        class: `${this.props.className ?? ''}`,
        onclose: (force?: boolean) => {
          if (this.props.onclose?.(force ?? false)) {
            return true;
          }
          this.handleClose(); // only when false, do close process.
          return false;
        },
      });
      this.forceUpdate();
    } catch (e) {
      console.error(e);
      this.winBoxObj?.close(true);
      this.setState({closed: true});
    }
  }

  componentDidUpdate(prevProps: Readonly<WinBoxPropType>, prevState: Readonly<WinBoxState>) {
    this.maintain({prevProps});
  }

  componentWillUnmount() {
    try {
      this.winBoxObj?.close(true);
    } catch (ignored) {}
  }

  public forceUpdate(callback?: () => void): void {
    try {
      this.maintain({force: true});
    } catch (e) {
      console.error(e);
      this.winBoxObj?.close(true);
      this.setState({closed: true});
    }

    super.forceUpdate(callback);
  }

  public focus = (): void => (this.winBoxObj?.focus());

  public getId = (): string | undefined => (this.winBoxObj?.id);

  public isMax = (): boolean => (this.winBoxObj?.max ?? false);

  public isMin = (): boolean => (this.winBoxObj?.min ?? false);

  public isClosed = (): boolean => (this.state.closed);

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

  maintain = (args ?: { force?: boolean, prevProps?: WinBoxPropType }) => {
    if (!this.winBoxObj) return;
    const {force, prevProps} = args ?? {};
    if (force || prevProps?.title !== this.props.title) {
      if (this.props.title !== undefined)
        this.winBoxObj?.setTitle(this.props.title);
    }
    if (force || prevProps?.fullscreen !== this.props.fullscreen) {
      if (this.props.fullscreen !== undefined)
        this.winBoxObj?.fullscreen(this.props.fullscreen);
    }
    if (force || prevProps?.min !== this.props.min) {
      if (this.props.min !== undefined)
        this.winBoxObj?.minimize(this.props.min);
    }
    if (force || prevProps?.max !== this.props.max) {
      if (this.props.max !== undefined)
        this.winBoxObj?.maximize(this.props.max);
    }
    if (force
      || prevProps?.width !== this.props.width
      || prevProps?.height !== this.props.height
    ) {
      const width = this.props.width ?? this.winBoxObj.width;
      const height = this.props.height ?? this.winBoxObj.height;
      // use function params rather than assigning fields directly to avoid the 'just support numbers' feature
      // see https://github.com/nextapps-de/winbox#custom-position--size
      this.winBoxObj?.resize(width, height);
    }
    if (force
      || prevProps?.x !== this.props.x
      || prevProps?.y !== this.props.y
    ) {
      const x = this.props.x ?? this.winBoxObj.x;
      const y = this.props.y ?? this.winBoxObj.y;
      // use function params rather than assigning fields directly to avoid the 'just support numbers' feature
      // see https://github.com/nextapps-de/winbox#custom-position--size
      this.winBoxObj?.move(x, y);
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
      this.winBoxObj?.move();
    }
    if (force || prevProps?.url !== this.props.url) {
      if (this.props.url !== undefined)
        this.winBoxObj?.setUrl(this.props.url);
    }
    this.maintainStyle();
  };

  handleClose = () => {
    this.winBoxObj = undefined;
    this.setState({closed: true});
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
