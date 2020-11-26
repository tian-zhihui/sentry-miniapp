import { __assign } from "tslib";
import { getCurrentHub } from "@sentry/core";
import { logger } from "@sentry/utils";
import { sdk } from "../crossPlatform";
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
        this._options = __assign({ onerror: true, onunhandledrejection: true, onpagenotfound: true, onmemorywarning: true }, options);
    }
    /**
     * @inheritDoc
     */
    GlobalHandlers.prototype.setupOnce = function () {
        Error.stackTraceLimit = 50;
        if (this._options.onerror) {
            logger.log("Global Handler attached: onError");
            this._installGlobalOnErrorHandler();
        }
        if (this._options.onunhandledrejection) {
            logger.log("Global Handler attached: onunhandledrejection");
            this._installGlobalOnUnhandledRejectionHandler();
        }
        if (this._options.onpagenotfound) {
            logger.log("Global Handler attached: onPageNotFound");
            this._installGlobalOnPageNotFoundHandler();
        }
        if (this._options.onmemorywarning) {
            logger.log("Global Handler attached: onMemoryWarning");
            this._installGlobalOnMemoryWarningHandler();
        }
    };
    /** JSDoc */
    GlobalHandlers.prototype._installGlobalOnErrorHandler = function () {
        if (this._onErrorHandlerInstalled) {
            return;
        }
        if (!!sdk.onError) {
            var currentHub_1 = getCurrentHub();
            sdk.onError(function (error) {
                // console.info("sentry-miniapp", error);
                currentHub_1.captureException(new Error(error));
            });
        }
        this._onErrorHandlerInstalled = true;
    };
    /** JSDoc */
    GlobalHandlers.prototype._installGlobalOnUnhandledRejectionHandler = function () {
        if (this._onUnhandledRejectionHandlerInstalled) {
            return;
        }
        if (!!sdk.onUnhandledRejection) {
            var currentHub_2 = getCurrentHub();
            sdk.onUnhandledRejection(function (_a) {
                var reason = _a.reason, promise = _a.promise;
                currentHub_2.captureException(new Error(reason), {
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
        if (!!sdk.onPageNotFound) {
            var currentHub_3 = getCurrentHub();
            sdk.onPageNotFound(function (res) {
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
        if (!!sdk.onMemoryWarning) {
            var currentHub_4 = getCurrentHub();
            sdk.onMemoryWarning(function (_a) {
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
export { GlobalHandlers };
//# sourceMappingURL=globalhandlers.js.map