"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var winbox_1 = __importDefault(require("winbox/src/js/winbox"));
require("winbox/dist/css/winbox.min.css");
var react_dom_1 = __importDefault(require("react-dom"));
/**
 * # WinBox React Component
 *
 * @see https://github.com/rickonono3/react-winbox
 * @see https://github.com/nextapps-de/winbox
 */
var WinBox = /** @class */ (function (_super) {
    __extends(WinBox, _super);
    function WinBox(props) {
        var _this = _super.call(this, props) || this;
        _this.cdmCount = 0;
        _this.checkReactVersionGE18 = function () {
            var a = parseInt(react_1.default.version.split('.')[0]);
            return (a >= 18);
        };
        _this.getId = function () { var _a; return ((_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.id); };
        _this.getIndex = function () { var _a; return ((_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.index); };
        _this.getPosition = function () {
            if (_this.winBoxObj) {
                return {
                    x: _this.winBoxObj.x,
                    y: _this.winBoxObj.y,
                };
            }
            return undefined;
        };
        _this.getSize = function () {
            if (_this.winBoxObj) {
                return {
                    width: _this.winBoxObj.width,
                    height: _this.winBoxObj.height,
                };
            }
            return undefined;
        };
        _this.getSizeLimit = function () {
            if (_this.winBoxObj) {
                return {
                    minWidth: _this.winBoxObj.minwidth,
                    minHeight: _this.winBoxObj.minheight,
                    maxWidth: _this.winBoxObj.maxwidth,
                    maxHeight: _this.winBoxObj.maxheight,
                };
            }
            return undefined;
        };
        _this.getViewportBoundary = function () {
            if (_this.winBoxObj) {
                return {
                    top: _this.winBoxObj.top,
                    right: _this.winBoxObj.right,
                    bottom: _this.winBoxObj.bottom,
                    left: _this.winBoxObj.left,
                };
            }
            return undefined;
        };
        _this.isFocused = function () { var _a, _b; return ((_b = (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.focused) !== null && _b !== void 0 ? _b : false); };
        _this.isHidden = function () { var _a, _b; return ((_b = (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.hidden) !== null && _b !== void 0 ? _b : false); };
        _this.isMax = function () { var _a, _b; return ((_b = (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.max) !== null && _b !== void 0 ? _b : false); };
        _this.isMin = function () { var _a, _b; return ((_b = (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.min) !== null && _b !== void 0 ? _b : false); };
        _this.isFullscreen = function () { var _a, _b; return ((_b = (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.full) !== null && _b !== void 0 ? _b : false); };
        _this.isClosed = function () { return (_this.state.closed); };
        _this.focus = function () { var _a; (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.focus(); };
        _this.blur = function () { var _a; (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.blur(); };
        /** We suggest using `min` prop instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
        _this.minimize = function () { var _a; (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.minimize(); };
        /** We suggest using `max` prop instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
        _this.maximize = function () { var _a; (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.maximize(); };
        /** We suggest using `fullscreen` prop instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
        _this.fullscreen = function () { var _a; (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.fullscreen(); };
        /** We suggest using `max`/`min`/`fullscreen` props instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
        _this.restore = function () { var _a; (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.restore(); };
        /** We suggest using `hide` props instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
        _this.hide = function () { var _a; (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.hide(); };
        /** We suggest using `hide` props instead of this method. If you have to forcely refresh the winbox's state, may `forceUpdate` would be better?*/
        _this.show = function () { var _a; (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.show(); };
        _this.maintainStyle = function () {
            if (!_this.winBoxObj)
                return;
            _this.winBoxObj[_this.props.noAnimation ? 'addClass' : 'removeClass']('no-animation');
            _this.winBoxObj[_this.props.noClose ? 'addClass' : 'removeClass']('no-close');
            _this.winBoxObj[_this.props.noFull ? 'addClass' : 'removeClass']('no-full');
            _this.winBoxObj[_this.props.noMin ? 'addClass' : 'removeClass']('no-min');
            _this.winBoxObj[_this.props.noMax ? 'addClass' : 'removeClass']('no-max');
            _this.winBoxObj[_this.props.noMove ? 'addClass' : 'removeClass']('no-move');
            _this.winBoxObj[_this.props.noHeader ? 'addClass' : 'removeClass']('no-header');
            _this.winBoxObj[_this.props.noResize ? 'addClass' : 'removeClass']('no-resize');
            _this.winBoxObj[_this.props.noShadow ? 'addClass' : 'removeClass']('no-shadow');
            _this.winBoxObj[_this.props.modal ? 'addClass' : 'removeClass']('modal');
            _this.winBoxObj[_this.props.hide ? 'addClass' : 'removeClass']('hide');
        };
        _this.maintain = function (args) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            if (!_this.winBoxObj)
                return;
            var _o = args !== null && args !== void 0 ? args : {}, force = _o.force, prevProps = _o.prevProps;
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.title) !== _this.props.title) {
                if (typeof _this.props.title === 'string')
                    _this.winBoxObj.setTitle(_this.props.title);
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.icon) !== _this.props.icon) {
                if (typeof _this.props.icon === 'string')
                    _this.winBoxObj.setIcon(_this.props.icon);
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.url) !== _this.props.url) {
                if (_this.props.url != undefined)
                    _this.winBoxObj.setUrl(_this.props.url);
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.background) !== _this.props.background) {
                if (_this.props.background != undefined)
                    _this.winBoxObj.setBackground(_this.props.background);
            }
            if (force
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.minWidth) !== _this.props.minWidth
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.minHeight) !== _this.props.minHeight
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.maxWidth) !== _this.props.maxWidth
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.maxHeight) !== _this.props.maxHeight) {
                var minWidth = (_a = _this.props.minWidth) !== null && _a !== void 0 ? _a : _this.winBoxObj.minwidth;
                var minHeight = (_b = _this.props.minHeight) !== null && _b !== void 0 ? _b : _this.winBoxObj.minheight;
                var maxWidth = (_c = _this.props.maxWidth) !== null && _c !== void 0 ? _c : _this.winBoxObj.maxwidth;
                var maxHeight = (_d = _this.props.maxHeight) !== null && _d !== void 0 ? _d : _this.winBoxObj.maxheight;
                _this.winBoxObj.minwidth = minWidth;
                _this.winBoxObj.minheight = minHeight;
                _this.winBoxObj.maxwidth = maxWidth;
                _this.winBoxObj.maxheight = maxHeight;
            }
            if (force
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.width) !== _this.props.width
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.height) !== _this.props.height) {
                var width = (_e = _this.props.width) !== null && _e !== void 0 ? _e : _this.winBoxObj.width;
                var height = (_f = _this.props.height) !== null && _f !== void 0 ? _f : _this.winBoxObj.height;
                // use function params rather than assigning fields directly to avoid the 'just support numbers' feature
                // see https://github.com/nextapps-de/winbox#custom-position--size
                _this.winBoxObj.resize(width, height);
            }
            if (force
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.x) !== _this.props.x
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.y) !== _this.props.y) {
                var x = (_g = _this.props.x) !== null && _g !== void 0 ? _g : _this.winBoxObj.x;
                var y = (_h = _this.props.y) !== null && _h !== void 0 ? _h : _this.winBoxObj.y;
                // use function params rather than assigning fields directly to avoid the 'just support numbers' feature
                // see https://github.com/nextapps-de/winbox#custom-position--size
                _this.winBoxObj.move(x, y);
            }
            if (force
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.top) !== _this.props.top
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.right) !== _this.props.right
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.bottom) !== _this.props.bottom
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.left) !== _this.props.left) {
                _this.winBoxObj.top = (_j = _this.props.top) !== null && _j !== void 0 ? _j : _this.winBoxObj.top;
                _this.winBoxObj.right = (_k = _this.props.right) !== null && _k !== void 0 ? _k : _this.winBoxObj.right;
                _this.winBoxObj.bottom = (_l = _this.props.bottom) !== null && _l !== void 0 ? _l : _this.winBoxObj.bottom;
                _this.winBoxObj.left = (_m = _this.props.left) !== null && _m !== void 0 ? _m : _this.winBoxObj.left;
                _this.winBoxObj.move();
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.fullscreen) !== _this.props.fullscreen) {
                if (_this.props.fullscreen != undefined)
                    _this.winBoxObj.fullscreen(_this.props.fullscreen);
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.min) !== _this.props.min) {
                if (_this.props.min != undefined)
                    _this.winBoxObj.minimize(_this.props.min);
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.max) !== _this.props.max) {
                if (_this.props.max != undefined)
                    _this.winBoxObj.maximize(_this.props.max);
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.className) !== _this.props.className) {
                if ((prevProps === null || prevProps === void 0 ? void 0 : prevProps.className) != undefined) {
                    var classes = prevProps.className.replaceAll(/\s+/g, ' ').split(' ').filter(function (c) { return c != ''; });
                    for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
                        var c = classes_1[_i];
                        if (_this.winBoxObj.hasClass(c)) {
                            _this.winBoxObj.removeClass(c);
                        }
                    }
                }
                if (_this.props.className != undefined) {
                    var classes = _this.props.className.replaceAll(/\s+/g, ' ').split(' ').filter(function (c) { return c != ''; });
                    for (var _p = 0, classes_2 = classes; _p < classes_2.length; _p++) {
                        var c = classes_2[_p];
                        if (!_this.winBoxObj.hasClass(c)) {
                            _this.winBoxObj.addClass(c);
                        }
                    }
                }
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.customControls) !== _this.props.customControls
                && !deepEqual(prevProps === null || prevProps === void 0 ? void 0 : prevProps.customControls, _this.props.customControls)) {
                if ((prevProps === null || prevProps === void 0 ? void 0 : prevProps.customControls) != undefined) {
                    prevProps.customControls
                        .filter(function (o) { return typeof o === 'object' && o.class; })
                        .forEach(function (o) { return _this.winBoxObj.removeControl(o.class); });
                }
                if (_this.props.customControls != undefined) {
                    _this.props.customControls
                        .filter(function (o) { return typeof o === 'object' && o.class; })
                        .forEach(function (o) { return _this.winBoxObj.addControl(o); });
                }
            }
            _this.maintainStyle();
        };
        _this.handleClose = function () {
            _this.winBoxObj = undefined;
            _this.setState({ closed: true });
        };
        _this.state = {
            closed: false,
        };
        _this.winBoxObj = undefined;
        return _this;
    }
    WinBox.prototype.componentDidMount = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.cdmCount++;
        if (this.checkReactVersionGE18()) { // strict mode safe
            if (this.cdmCount >= 2)
                return;
        }
        try {
            if (this.props.id !== undefined && this.props.id !== null && document.getElementById(this.props.id))
                throw 'duplicated window id';
            this.winBoxObj = winbox_1.default.new(__assign(__assign({ width: 300, height: 200, top: 0, bottom: 0, left: 0, right: 0, hidden: this.props.hide }, this.props), { 
                // 👇override values
                minwidth: (_a = this.props.minWidth) !== null && _a !== void 0 ? _a : 150, maxwidth: (_b = this.props.maxWidth) !== null && _b !== void 0 ? _b : 2147483647, minheight: (_c = this.props.minHeight) !== null && _c !== void 0 ? _c : 35, maxheight: (_d = this.props.maxHeight) !== null && _d !== void 0 ? _d : 2147483647, max: false, min: false, fullscreen: false, class: "".concat((_e = this.props.className) !== null && _e !== void 0 ? _e : ''), onclose: function (force) {
                    var _a, _b, _c, _d;
                    if ((_b = (_a = _this.props).onClose) === null || _b === void 0 ? void 0 : _b.call(_a, force !== null && force !== void 0 ? force : false)) {
                        return true;
                    }
                    else if ((_d = (_c = _this.props).onclose) === null || _d === void 0 ? void 0 : _d.call(_c, force !== null && force !== void 0 ? force : false)) {
                        return true;
                    }
                    _this.handleClose(); // only when false, run close process.
                    return false;
                }, onmove: (_f = this.props.onMove) !== null && _f !== void 0 ? _f : this.props.onmove, onresize: (_g = this.props.onResize) !== null && _g !== void 0 ? _g : this.props.onresize, onblur: (_h = this.props.onBlur) !== null && _h !== void 0 ? _h : this.props.onblur, onfocus: (_j = this.props.onFocus) !== null && _j !== void 0 ? _j : this.props.onfocus, oncreate: this.props.onCreate, onfullscreen: this.props.onFullscreen, onminimize: this.props.onMinimize, onmaximize: this.props.onMaximize, onrestore: this.props.onRestore, onhide: this.props.onHide, onshow: this.props.onShow }));
            setTimeout(function () {
                _this.forceUpdate();
            });
        }
        catch (e) {
            console.error(e);
            //this.winBoxObj?.close(true);
            //this.setState({ closed: true });
        }
    };
    WinBox.prototype.componentDidUpdate = function (prevProps, prevState) {
        this.maintain({ prevProps: prevProps });
    };
    WinBox.prototype.componentWillUnmount = function () {
        var _this = this;
        var _a, _b;
        try {
            if (this.checkReactVersionGE18()) { // strict mode safe (depends on the timeout of 100ms, in low performance enviroments may crash.)
                if (this.cdmCount <= 1) {
                    setTimeout(function () {
                        var _a;
                        if (_this.cdmCount <= 1) {
                            (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.close(true);
                        }
                    }, 100);
                }
                else {
                    (_a = this.winBoxObj) === null || _a === void 0 ? void 0 : _a.close(true);
                }
            }
            else { // less than 18, keep old code
                (_b = this.winBoxObj) === null || _b === void 0 ? void 0 : _b.close(true);
            }
        }
        catch (ignored) { }
    };
    WinBox.prototype.forceUpdate = function (callback) {
        try {
            this.maintain({ force: true });
        }
        catch (e) {
            console.error(e);
            //this.winBoxObj?.close(true);
            //this.setState({ closed: true });
        }
        _super.prototype.forceUpdate.call(this, callback);
    };
    WinBox.prototype.render = function () {
        if (Object.keys(this.props).indexOf('url') !== -1 && this.props.url)
            return null; // do nothing if url is set.
        if (!this.winBoxObj || !this.winBoxObj.body)
            return null;
        return react_dom_1.default.createPortal((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: this.props.children }), this.winBoxObj.body);
    };
    return WinBox;
}(react_1.Component));
exports.default = WinBox;
function deepEqual(x, y) {
    var ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (ok(x).length === ok(y).length &&
        ok(x).every(function (key) { return deepEqual(x[key], y[key]); })) : (x === y);
}
