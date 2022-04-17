import React, {Component, ReactChild} from 'react';
import OriginalWinBox from 'winbox/src/js/winbox';
import {createRoot, Root} from 'react-dom/client';

type WinBoxPropType = {
  title: string
  children: ReactChild
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

  x?: string | number,
  y?: string | number,
  top?: string | number,
  bottom?: string | number,
  left?: string | number,
  right?: string | number,
  height?: string | number,
  width?: string | number,
  fullscreen?: boolean,

  /**
   * see the following document for more detail about the argument and the return value.
   * @see https://github.com/nextapps-de/winbox
   * @param force whether you should not abort the winbox to close.
   * @return canBeClosed - true if the winbox can be closed
   */
  onclose?: (force?: boolean) => boolean,
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
 * Use refs to call focus(), isMax(), isMin() method if need. But for others, use props instead of refs.
 * @see https://github.com/rickonono3/react-winbox
 * @see https://github.com/nextapps-de/winbox
 */
class WinBox extends Component<WinBoxPropType, WinBoxState> {
  public winBoxObj: OriginalWinBox;

  private reactRoot: Root | undefined;

  constructor(props) {
    super(props);
    this.state = {
      closed: false,
    };
  }

  componentDidMount() {
    try {
      this.winBoxObj = new OriginalWinBox({
        width: 300.01, // fix the equality when props updated
        height: 200.01,
        top: 0.01,
        bottom: 0.01,
        left: 0.01,
        right: 0.01,
        ...this.props,
        class: `${this.props.className}`,
        onClose: () => {
          this.handleClose();
          return this.props.onclose?.() ?? true;
        },
      });
      this.renderChildren();
      this.maintainStyle();
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
    this.winBoxObj?.close(true);
    this.handleClose();
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

  public focus = (): void => {
    this.winBoxObj?.focus();
  };

  public isMax = (): boolean => (this.winBoxObj?.max ?? false);

  public isMin = (): boolean => (this.winBoxObj?.min ?? false);

  renderChildren = () => {
    if (Object.keys(this.props).indexOf('url') !== -1 && this.props.url)
      return; // do nothing if url is set.
    if (!this.reactRoot) {
      // this.reactRoot = hydrateRoot(this.winBoxObj.body, this.props.children);
      this.reactRoot = createRoot(this.winBoxObj.body);
      this.reactRoot.render(this.props.children);
    } else {
      this.reactRoot.render(this.props.children);
    }
  };

  maintainStyle = () => {
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
    const {force, prevProps} = args ?? {};
    if (force || prevProps?.title !== this.props.title) {
      this.winBoxObj?.setTitle(this.props.title);
    }
    if (force || prevProps?.fullscreen !== this.props.fullscreen) {
      this.winBoxObj?.fullscreen(this.props.fullscreen);
    }
    if (force || prevProps?.min !== this.props.min) {
      this.winBoxObj?.minimize(this.props.min);
    }
    if (force || prevProps?.max !== this.props.max) {
      this.winBoxObj?.maximize(this.props.max);
    }
    if (force
      || prevProps?.width !== this.props.width
      || prevProps?.height !== this.props.height
    ) {
      this.winBoxObj.width = this.props.width ?? this.winBoxObj.width;
      this.winBoxObj.height = this.props.height ?? this.winBoxObj.height;
      this.winBoxObj?.resize(); // resize before move, see https://github.com/nextapps-de/winbox#chaining-methods
    }
    if (force
      || prevProps?.x !== this.props.x
      || prevProps?.y !== this.props.y
    ) {
      this.winBoxObj.x = this.props.x ?? this.winBoxObj.x;
      this.winBoxObj.y = this.props.y ?? this.winBoxObj.y;
      this.winBoxObj?.move();
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
      this.winBoxObj?.setUrl(this.props.url);
    }
    this.renderChildren();
    this.maintainStyle();
  };

  handleClose = () => {
    this.reactRoot?.unmount();
    this.setState({closed: true});
  };

  render() {
    return (
      <div/>
    );
  }
}

export default WinBox;
