Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@sentry/core");
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
        this._options = tslib_1.__assign({ enable: true }, options);
    }
    /**
     * @inheritDoc
     */
    Router.prototype.setupOnce = function () {
        var _this = this;
        core_1.addGlobalEventProcessor(function (event) {
            if (core_1.getCurrentHub().getIntegration(Router)) {
                if (_this._options.enable) {
                    try {
                        var routers = getCurrentPages().map(function (route) { return ({
                            route: route.route,
                            options: route.options,
                        }); });
                        return tslib_1.__assign(tslib_1.__assign({}, event), { extra: tslib_1.__assign(tslib_1.__assign({}, event.extra), { routers: routers }) });
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
exports.Router = Router;
//# sourceMappingURL=router.js.map