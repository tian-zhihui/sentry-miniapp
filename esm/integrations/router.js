import { __assign } from "tslib";
import { addGlobalEventProcessor, getCurrentHub } from "@sentry/core";
/** UserAgent */
var Router = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    function Router(options) {
        /**
         * @inheritDoc
         */
        this.name = Router.id;
        this._options = __assign({ enable: true }, options);
    }
    /**
     * @inheritDoc
     */
    Router.prototype.setupOnce = function () {
        var _this = this;
        addGlobalEventProcessor(function (event) {
            if (getCurrentHub().getIntegration(Router)) {
                if (_this._options.enable) {
                    try {
                        var routers = getCurrentPages().map(function (route) { return ({
                            route: route.route,
                            options: route.options,
                        }); });
                        return __assign(__assign({}, event), { extra: __assign(__assign({}, event.extra), { routers: routers }) });
                    }
                    catch (e) {
                        console.warn("sentry-miniapp get router info fail: " + e);
                    }
                }
            }
            return event;
        });
    };
    /**
     * @inheritDoc
     */
    Router.id = "Router";
    return Router;
}());
export { Router };
//# sourceMappingURL=router.js.map