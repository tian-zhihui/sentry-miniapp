Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalHandlers = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@sentry/core");
var utils_1 = require("@sentry/utils");
var crossPlatform_1 = require("../crossPlatform");
/** Global handlers */
var GlobalHandlers = /** @class */ (function () {
    /** JSDoc */
    function GlobalHandlers(options) {
        /**
         * @inheritDoc
         */
        this.name = GlobalHandlers.id;
        /** JSDoc */
        this._onErrorHandlerInstalled = false;
        /** JSDoc */
        this._onUnhandledRejectionHandlerInstalled = false;
        /** JSDoc */
        this._onPageNotFoundHandlerInstalled = false;
        /** JSDoc */
        this._onMemoryWarningHandlerInstalled = false;
        this._options = tslib_1.__assign({ onerror: true, onunhandledrejection: true, onpagenotfound: true, onmemorywarning: true }, options);
    }
    /**
     * @inheritDoc
     */
    GlobalHandlers.prototype.setupOnce = function () {
        Error.stackTraceLimit = 50;
        if (this._options.onerror) {
            utils_1.logger.log("Global Handler attached: onError");
            this._installGlobalOnErrorHandler();
        }
        if (this._options.onunhandledrejection) {
            utils_1.logger.log("Global Handler attached: onunhandledrejection");
            this._installGlobalOnUnhandledRejectionHandler();
        }
        if (this._options.onpagenotfound) {
            utils_1.logger.log("Global Handler attached: onPageNotFound");
            this._installGlobalOnPageNotFoundHandler();
        }
        if (this._options.onmemorywarning) {
            utils_1.logger.log("Global Handler attached: onMemoryWarning");
            this._installGlobalOnMemoryWarningHandler();
        }
    };
    /** JSDoc */
    GlobalHandlers.prototype._installGlobalOnErrorHandler = function () {
        if (this._onErrorHandlerInstalled) {
            return;
        }
        if (!!crossPlatform_1.sdk.onError) {
            var currentHub_1 = core_1.getCurrentHub();
            // https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onError.html
            crossPlatform_1.sdk.onError(function (err) {
                // console.info("sentry-miniapp", error);
                var error = typeof err === 'string' ? new Error(err) : err;
                currentHub_1.captureException(error);
            });
        }
        this._onErrorHandlerInstalled = true;
    };
    /** JSDoc */
    GlobalHandlers.prototype._installGlobalOnUnhandledRejectionHandler = function () {
        if (this._onUnhandledRejectionHandlerInstalled) {
            return;
        }
        if (!!crossPlatform_1.sdk.onUnhandledRejection) {
            var currentHub_2 = core_1.getCurrentHub();
            // https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onUnhandledRejection.html
            crossPlatform_1.sdk.onUnhandledRejection(function (_a) {
                var reason = _a.reason, promise = _a.promise;
                // console.log(reason, typeof reason, promise)
                // 为什么官方文档上说 reason 是 string 类型，但是实际返回的确实 object 类型
                var error = typeof reason === 'string' ? new Error(reason) : reason;
                currentHub_2.captureException(error, {
                    data: promise,
                });
            });
        }
        this._onUnhandledRejectionHandlerInstalled = true;
    };
    /** JSDoc */
    GlobalHandlers.prototype._installGlobalOnPageNotFoundHandler = function () {
        if (this._onPageNotFoundHandlerInstalled) {
            return;
        }
        if (!!crossPlatform_1.sdk.onPageNotFound) {
            var currentHub_3 = core_1.getCurrentHub();
            crossPlatform_1.sdk.onPageNotFound(function (res) {
                var url = res.path.split("?")[0];
                currentHub_3.setTag("pagenotfound", url);
                currentHub_3.setExtra("message", JSON.stringify(res));
                currentHub_3.captureMessage("\u9875\u9762\u65E0\u6CD5\u627E\u5230: " + url);
            });
        }
        this._onPageNotFoundHandlerInstalled = true;
    };
    /** JSDoc */
    GlobalHandlers.prototype._installGlobalOnMemoryWarningHandler = function () {
        if (this._onMemoryWarningHandlerInstalled) {
            return;
        }
        if (!!crossPlatform_1.sdk.onMemoryWarning) {
            var currentHub_4 = core_1.getCurrentHub();
            crossPlatform_1.sdk.onMemoryWarning(function (_a) {
                var _b = _a.level, level = _b === void 0 ? -1 : _b;
                var levelMessage = "没有获取到告警级别信息";
                switch (level) {
                    case 5:
                        levelMessage = "TRIM_MEMORY_RUNNING_MODERATE";
                        break;
                    case 10:
                        levelMessage = "TRIM_MEMORY_RUNNING_LOW";
                        break;
                    case 15:
                        levelMessage = "TRIM_MEMORY_RUNNING_CRITICAL";
                        break;
                    default:
                        return;
                }
                currentHub_4.setTag("memory-warning", String(level));
                currentHub_4.setExtra("message", levelMessage);
                currentHub_4.captureMessage("\u5185\u5B58\u4E0D\u8DB3\u544A\u8B66");
            });
        }
        this._onMemoryWarningHandlerInstalled = true;
    };
    /**
     * @inheritDoc
     */
    GlobalHandlers.id = "GlobalHandlers";
    return GlobalHandlers;
}());
exports.GlobalHandlers = GlobalHandlers;
//# sourceMappingURL=globalhandlers.js.map