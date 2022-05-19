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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var winbox_1 = __importDefault(require("winbox/src/js/winbox"));
require("winbox/dist/css/winbox.min.css");
var react_dom_1 = __importDefault(require("react-dom"));
/**
 * # WinBox React Component
 *
 * Use refs to call focus(), isMax(), isMin(), getId(), isClosed() methods if need. But for others, use props instead of refs.
 * @see https://github.com/rickonono3/react-winbox
 * @see https://github.com/nextapps-de/winbox
 */
var WinBox = /** @class */ (function (_super) {
    __extends(WinBox, _super);
    function WinBox(props) {
        var _this = _super.call(this, props) || this;
        _this.focus = function () { var _a; return ((_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.focus()); };
        _this.getId = function () { var _a; return ((_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.id); };
        _this.isMax = function () { var _a, _b; return ((_b = (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.max) !== null && _b !== void 0 ? _b : false); };
        _this.isMin = function () { var _a, _b; return ((_b = (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.min) !== null && _b !== void 0 ? _b : false); };
        _this.isClosed = function () { return (_this.state.closed); };
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
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            if (!_this.winBoxObj)
                return;
            var _s = args !== null && args !== void 0 ? args : {}, force = _s.force, prevProps = _s.prevProps;
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.title) !== _this.props.title) {
                if (_this.props.title !== undefined)
                    (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.setTitle(_this.props.title);
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.fullscreen) !== _this.props.fullscreen) {
                if (_this.props.fullscreen !== undefined)
                    (_b = _this.winBoxObj) === null || _b === void 0 ? void 0 : _b.fullscreen(_this.props.fullscreen);
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.min) !== _this.props.min) {
                if (_this.props.min !== undefined)
                    (_c = _this.winBoxObj) === null || _c === void 0 ? void 0 : _c.minimize(_this.props.min);
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.max) !== _this.props.max) {
                if (_this.props.max !== undefined)
                    (_d = _this.winBoxObj) === null || _d === void 0 ? void 0 : _d.maximize(_this.props.max);
            }
            if (force
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.width) !== _this.props.width
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.height) !== _this.props.height) {
                var width = (_e = _this.props.width) !== null && _e !== void 0 ? _e : _this.winBoxObj.width;
                var height = (_f = _this.props.height) !== null && _f !== void 0 ? _f : _this.winBoxObj.height;
                // use function params rather than assigning fields directly to avoid the 'just support numbers' feature
                // see https://github.com/nextapps-de/winbox#custom-position--size
                (_g = _this.winBoxObj) === null || _g === void 0 ? void 0 : _g.resize(width, height);
            }
            if (force
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.x) !== _this.props.x
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.y) !== _this.props.y) {
                var x = (_h = _this.props.x) !== null && _h !== void 0 ? _h : _this.winBoxObj.x;
                var y = (_j = _this.props.y) !== null && _j !== void 0 ? _j : _this.winBoxObj.y;
                // use function params rather than assigning fields directly to avoid the 'just support numbers' feature
                // see https://github.com/nextapps-de/winbox#custom-position--size
                (_k = _this.winBoxObj) === null || _k === void 0 ? void 0 : _k.move(x, y);
            }
            if (force
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.top) !== _this.props.top
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.right) !== _this.props.right
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.bottom) !== _this.props.bottom
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.left) !== _this.props.left) {
                _this.winBoxObj.top = (_l = _this.props.top) !== null && _l !== void 0 ? _l : _this.winBoxObj.top;
                _this.winBoxObj.right = (_m = _this.props.right) !== null && _m !== void 0 ? _m : _this.winBoxObj.right;
                _this.winBoxObj.bottom = (_o = _this.props.bottom) !== null && _o !== void 0 ? _o : _this.winBoxObj.bottom;
                _this.winBoxObj.left = (_p = _this.props.left) !== null && _p !== void 0 ? _p : _this.winBoxObj.left;
                (_q = _this.winBoxObj) === null || _q === void 0 ? void 0 : _q.move();
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.url) !== _this.props.url) {
                if (_this.props.url !== undefined)
                    (_r = _this.winBoxObj) === null || _r === void 0 ? void 0 : _r.setUrl(_this.props.url);
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
        var _a, _b;
        try {
            if (this.props.id !== undefined && this.props.id !== null && document.getElementById(this.props.id))
                throw 'duplicated window id';
            this.winBoxObj = new winbox_1.default(__assign(__assign({ width: 300, height: 200, top: 0, bottom: 0, left: 0, right: 0 }, this.props), { class: "".concat((_a = this.props.className) !== null && _a !== void 0 ? _a : ''), onclose: function (force) {
                    var _a, _b;
                    if ((_b = (_a = _this.props).onclose) === null || _b === void 0 ? void 0 : _b.call(_a, force !== null && force !== void 0 ? force : false)) {
                        return true;
                    }
                    _this.handleClose(); // only when false, do close process.
                    return false;
                } }));
            this.forceUpdate();
        }
        catch (e) {
            console.error(e);
            (_b = this.winBoxObj) === null || _b === void 0 ? void 0 : _b.close(true);
            this.setState({ closed: true });
        }
    };
    WinBox.prototype.componentDidUpdate = function (prevProps, prevState) {
        this.maintain({ prevProps: prevProps });
    };
    WinBox.prototype.componentWillUnmount = function () {
        var _a;
        try {
            (_a = this.winBoxObj) === null || _a === void 0 ? void 0 : _a.close(true);
        }
        catch (ignored) { }
    };
    WinBox.prototype.forceUpdate = function (callback) {
        var _a;
        try {
            this.maintain({ force: true });
        }
        catch (e) {
            console.error(e);
            (_a = this.winBoxObj) === null || _a === void 0 ? void 0 : _a.close(true);
            this.setState({ closed: true });
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
