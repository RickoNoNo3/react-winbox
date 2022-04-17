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
var client_1 = require("react-dom/client");
/**
 * # WinBox React Component
 *
 * Use refs to call focus(), isMax(), isMin() method if need. But for others, use props instead of refs.
 * @see https://github.com/rickonono3/react-winbox
 * @see https://github.com/nextapps-de/winbox
 */
var WinBox = /** @class */ (function (_super) {
    __extends(WinBox, _super);
    function WinBox(props) {
        var _this = _super.call(this, props) || this;
        _this.focus = function () {
            var _a;
            (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.focus();
        };
        _this.isMax = function () { var _a, _b; return ((_b = (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.max) !== null && _b !== void 0 ? _b : false); };
        _this.isMin = function () { var _a, _b; return ((_b = (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.min) !== null && _b !== void 0 ? _b : false); };
        _this.renderChildren = function () {
            if (Object.keys(_this.props).indexOf('url') !== -1 && _this.props.url)
                return; // do nothing if url is set.
            if (!_this.reactRoot) {
                // this.reactRoot = hydrateRoot(this.winBoxObj.body, this.props.children);
                _this.reactRoot = (0, client_1.createRoot)(_this.winBoxObj.body);
                _this.reactRoot.render(_this.props.children);
            }
            else {
                _this.reactRoot.render(_this.props.children);
            }
        };
        _this.maintainStyle = function () {
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
            var _s = args !== null && args !== void 0 ? args : {}, force = _s.force, prevProps = _s.prevProps;
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.title) !== _this.props.title) {
                (_a = _this.winBoxObj) === null || _a === void 0 ? void 0 : _a.setTitle(_this.props.title);
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.fullscreen) !== _this.props.fullscreen) {
                (_b = _this.winBoxObj) === null || _b === void 0 ? void 0 : _b.fullscreen(_this.props.fullscreen);
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.min) !== _this.props.min) {
                (_c = _this.winBoxObj) === null || _c === void 0 ? void 0 : _c.minimize(_this.props.min);
            }
            if (force || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.max) !== _this.props.max) {
                (_d = _this.winBoxObj) === null || _d === void 0 ? void 0 : _d.maximize(_this.props.max);
            }
            if (force
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.width) !== _this.props.width
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.height) !== _this.props.height) {
                _this.winBoxObj.width = (_e = _this.props.width) !== null && _e !== void 0 ? _e : _this.winBoxObj.width;
                _this.winBoxObj.height = (_f = _this.props.height) !== null && _f !== void 0 ? _f : _this.winBoxObj.height;
                (_g = _this.winBoxObj) === null || _g === void 0 ? void 0 : _g.resize(); // resize before move, see https://github.com/nextapps-de/winbox#chaining-methods
            }
            if (force
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.x) !== _this.props.x
                || (prevProps === null || prevProps === void 0 ? void 0 : prevProps.y) !== _this.props.y) {
                _this.winBoxObj.x = (_h = _this.props.x) !== null && _h !== void 0 ? _h : _this.winBoxObj.x;
                _this.winBoxObj.y = (_j = _this.props.y) !== null && _j !== void 0 ? _j : _this.winBoxObj.y;
                (_k = _this.winBoxObj) === null || _k === void 0 ? void 0 : _k.move();
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
                (_r = _this.winBoxObj) === null || _r === void 0 ? void 0 : _r.setUrl(_this.props.url);
            }
            _this.renderChildren();
            _this.maintainStyle();
        };
        _this.handleClose = function () {
            var _a;
            (_a = _this.reactRoot) === null || _a === void 0 ? void 0 : _a.unmount();
            _this.setState({ closed: true });
        };
        _this.state = {
            closed: false,
        };
        return _this;
    }
    WinBox.prototype.componentDidMount = function () {
        var _this = this;
        var _a;
        try {
            this.winBoxObj = new winbox_1.default(__assign(__assign({ width: 300.01, height: 200.01, top: 0.01, bottom: 0.01, left: 0.01, right: 0.01 }, this.props), { class: "".concat(this.props.className), onClose: function () {
                    var _a, _b, _c;
                    _this.handleClose();
                    return (_c = (_b = (_a = _this.props).onclose) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : true;
                } }));
            this.renderChildren();
            this.maintainStyle();
        }
        catch (e) {
            console.error(e);
            (_a = this.winBoxObj) === null || _a === void 0 ? void 0 : _a.close(true);
            this.setState({ closed: true });
        }
    };
    WinBox.prototype.componentDidUpdate = function (prevProps, prevState) {
        this.maintain({ prevProps: prevProps });
    };
    WinBox.prototype.componentWillUnmount = function () {
        var _a;
        (_a = this.winBoxObj) === null || _a === void 0 ? void 0 : _a.close(true);
        this.handleClose();
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
        return ((0, jsx_runtime_1.jsx)("div", {}));
    };
    return WinBox;
}(react_1.Component));
exports.default = WinBox;
