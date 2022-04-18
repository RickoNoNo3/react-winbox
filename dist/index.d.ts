import { Component, ReactChild, ReactNode } from 'react';
import OriginalWinBox from 'winbox/src/js/winbox';
declare type WinBoxPropType = {
    title: string;
    id?: string;
    children?: ReactChild | Iterable<ReactNode> | null;
    /**
     * When you use this, the children elements will be ignored.
     */
    url?: string;
    noAnimation?: boolean;
    noShadow?: boolean;
    noHeader?: boolean;
    noMin?: boolean;
    noMax?: boolean;
    noFull?: boolean;
    noClose?: boolean;
    noResize?: boolean;
    noMove?: boolean;
    modal?: boolean;
    hide?: boolean;
    index?: number;
    border?: number;
    splitscreen?: boolean;
    background?: string;
    max?: boolean;
    min?: boolean;
    x?: string | number | 'center';
    y?: string | number | 'center';
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
    height?: string | number;
    width?: string | number;
    fullscreen?: boolean;
    /**
     * see the following document for more detail about the argument and the return value.
     * @see https://github.com/nextapps-de/winbox
     * @param force whether you should not abort the winbox to close.
     * @return canBeClosed - true if the winbox can be closed
     */
    onclose?: (force?: boolean) => boolean;
    onmove?: (x: number, y: number) => any;
    onresize?: (width: number, height: number) => any;
    onblur?: () => any;
    onfocus?: () => any;
    className?: string | number;
};
declare type WinBoxState = {
    closed: boolean;
};
/**
 * # WinBox React Component
 *
 * Use refs to call focus(), isMax(), isMin(), getId(), isClosed() methods if need. But for others, use props instead of refs.
 * @see https://github.com/rickonono3/react-winbox
 * @see https://github.com/nextapps-de/winbox
 */
declare class WinBox extends Component<WinBoxPropType, WinBoxState> {
    winBoxObj: OriginalWinBox;
    private reactRoot;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<WinBoxPropType>, prevState: Readonly<WinBoxState>): void;
    componentWillUnmount(): void;
    forceUpdate(callback?: () => void): void;
    focus: () => void;
    getId: () => string | undefined;
    isMax: () => boolean;
    isMin: () => boolean;
    isClosed: () => boolean;
    renderChildren: () => void;
    maintainStyle: () => void;
    maintain: (args?: {
        force?: boolean | undefined;
        prevProps?: WinBoxPropType | undefined;
    } | undefined) => void;
    handleClose: () => void;
    render(): JSX.Element;
}
export default WinBox;
