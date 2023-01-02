import React, { Component, ReactElement } from 'react';
import OriginalWinBox from 'winbox/src/js/winbox';
export declare type WinBoxControlInfo = {
    /** Index to jump into native controls. If no index assigned, custum controls will be arranged side-by-side automatically on the left of native controls*/
    index?: number;
    /** a name to identify the button, can also style it by using css, may starts with `wb-` */
    class: string;
    /** an image resource same like icon prop */
    image: string;
    click?: () => void;
};
export declare type WinBoxPropType = {
    title?: string;
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
    icon?: string;
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
    background?: string;
    /** @deprecated this does not work since v1.5.0 */
    splitscreen?: boolean;
    max?: boolean;
    min?: boolean;
    fullscreen?: boolean;
    x?: string | number | 'center' | 'right';
    y?: string | number | 'center' | 'bottom';
    /** For dynamical changing, only supports numbers (px) */
    top?: string | number;
    /** For dynamical changing, only supports numbers (px) */
    bottom?: string | number;
    /** For dynamical changing, only supports numbers (px) */
    left?: string | number;
    /** For dynamical changing, only supports numbers (px) */
    right?: string | number;
    /** supports units "px" and "%" */
    height?: string | number;
    /** supports units "px" and "%" */
    width?: string | number;
    /**
     * This callback is called BEFORE the winbox goes to close process. So if you want to destroy the React WinBox component while it is triggered, be sure to wrap destroying actions within `setTimeout` so that they occur after the winbox.js DOM is truly closed，e.g. `setTimeout(() => setState({showWindow: false}))`
     *
     * see the following document for more detail about the argument and the return value.
     * @see https://github.com/nextapps-de/winbox
     * @param force Whether you should not abort the winbox to close. If this is true, you MUST return false, or some problems will happen.
     * @return noDefaultClose - true if the winbox does not need the default close process, for example, when it needs a confirmation to close instead of being closed suddenly.
     */
    onClose?: (force: boolean) => boolean | undefined | void;
    onMove?: (x: number, y: number) => any;
    onResize?: (width: number, height: number) => any;
    onBlur?: () => any;
    onFocus?: () => any;
    /** @deprecated use onClose instead */
    onclose?: (force: boolean) => boolean | undefined | void;
    /** @deprecated use onMove instead */
    onmove?: (x: number, y: number) => any;
    /** @deprecated use onMove instead */
    onresize?: (width: number, height: number) => any;
    /** @deprecated use onBlur instead */
    onblur?: () => any;
    /** @deprecated use onFocus instead */
    onfocus?: () => any;
    /** The `no-xxx` classes that winbox.js already appointed can not assign here, use special props instead, e.g. class `no-resize` to prop `noResize={true}` */
    className?: string;
    /** @deprecated Autosize the window for content. In React, that may be impossible, but the param is retained conservatively */
    autosize?: boolean;
    /** supports units "px" and "%". For dynamical changing, only supports numbers (px) */
    minWidth?: number | string;
    /** supports units "px" and "%". For dynamical changing, only supports numbers (px) */
    minHeight?: number | string;
    /** supports units "px" and "%". For dynamical changing, only supports numbers (px) */
    maxWidth?: number | string;
    /** supports units "px" and "%". For dynamical changing, only supports numbers (px) */
    maxHeight?: number | string;
    /** Callback triggered when the winbox element is being created */
    onCreate?: (options: any) => any;
    onFullscreen?: () => any;
    onMinimize?: () => any;
    onMaximize?: () => any;
    onRestore?: () => any;
    onHide?: () => any;
    onShow?: () => any;
    /**
     * an array of WinBoxControlInfo
     * @see https://github.com/nextapps-de/winbox#custom-controls
     */
    customControls?: WinBoxControlInfo[];
};
declare type WinBoxState = {
    closed: boolean;
};
/**
 * # WinBox React Component
 *
 * @see https://github.com/rickonono3/react-winbox
 * @see https://github.com/nextapps-de/winbox
 */
declare class WinBox extends Component<WinBoxPropType, WinBoxState> {
    winBoxObj?: OriginalWinBox;
    private cdmCount;
    private checkReactVersionGE18;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<WinBoxPropType>, prevState: Readonly<WinBoxState>): void;
    componentWillUnmount(): void;
    forceUpdate(callback?: () => void): void;
    getId: () => string | undefined;
    getIndex: () => number | undefined;
    getPosition: () => {
        x: number;
        y: number;
    } | undefined;
    getSize: () => {
        width: number;
        height: number;
    } | undefined;
    getSizeLimit: () => {
        minWidth: number;
        minHeight: number;
        maxWidth: number;
        maxHeight: number;
    } | undefined;
    getViewportBoundary: () => {
        top: number;
        right: number;
        bottom: number;
        left: number;
    } | undefined;
    isFocused: () => boolean;
    isHidden: () => boolean;
    isMax: () => boolean;
    isMin: () => boolean;
    isFullscreen: () => boolean;
    isClosed: () => boolean;
    focus: () => void;
    blur: () => void;
    /** We suggest using `min` prop instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
    minimize: () => void;
    /** We suggest using `max` prop instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
    maximize: () => void;
    /** We suggest using `fullscreen` prop instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
    fullscreen: () => void;
    /** We suggest using `max`/`min`/`fullscreen` props instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
    restore: () => void;
    /** We suggest using `hide` props instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
    hide: () => void;
    /** We suggest using `hide` props instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
    show: () => void;
    maintainStyle: () => void;
    maintain: (args?: {
        force?: boolean | undefined;
        prevProps?: WinBoxPropType | undefined;
    } | undefined) => void;
    handleClose: () => void;
    render(): React.ReactPortal | null;
}
export default WinBox;
