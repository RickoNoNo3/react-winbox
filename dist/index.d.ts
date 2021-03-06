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
     * This callback is called BEFORE the winbox goes to close process. So if you want to destroy the React WinBox component in it, be sure to wrap destroy actions within `setTimeout` so that they occur after the winbox.js DOM is truly closed，e.g. `setTimeout(() => setState({showWindow: false}))`
     *
     * see the following document for more detail about the argument and the return value.
     * @see https://github.com/nextapps-de/winbox
     * @param force Whether you should not abort the winbox to close. If this is true, you MUST return false, or some problems will happen.
     * @return noDefaultClose - true if the winbox does not need the default close process, for example, when it needs a confirmation to close instead of being closed suddenly.
     */
    onclose?: (force: boolean) => boolean | undefined | void;
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
