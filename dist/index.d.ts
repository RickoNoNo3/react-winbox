import React, { Component, ReactElement } from 'react';
import OriginalWinBox from 'winbox/src/js/winbox';
import 'winbox/dist/css/winbox.min.css';
export declare type WinBoxPropType = {
    title: string;
    id?: string;
    children?: ReactElement | ReactElement[] | null;
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
     * If you want to remove the React WinBox component in `onclose` callback, be sure to wrap it within `setTimeout` so that the remove behavior occurs after the winbox.js DOM is truly closed，e.g. `setTimeout(() => setState({showWindow: false}))`
     *
     * see the following document for more detail about the argument and the return value.
     * @see https://github.com/nextapps-de/winbox
     * @param force whether you should not abort the winbox to close.
     * @return noDefaultClose - true if the winbox does not need the default close process, for example, when it needs a confirmation to close.
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
    private reactRootTarget;
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
    maintainStyle: () => void;
    maintain: (args?: {
        force?: boolean | undefined;
        prevProps?: WinBoxPropType | undefined;
    } | undefined) => void;
    handleClose: () => void;
    render(): React.ReactPortal | null;
}
export default WinBox;
