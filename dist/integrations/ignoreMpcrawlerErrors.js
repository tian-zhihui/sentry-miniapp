Object.defineProperty(exports, "__esModule", { value: true });
exports.IgnoreMpcrawlerErrors = void 0;
var core_1 = require("@sentry/core");
var crossPlatform_1 = require("../crossPlatform");
/**
 * IgnoreMpcrawlerErrors
 *
 * https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/sitemap.html
 */
var IgnoreMpcrawlerErrors = /** @class */ (function () {
    function IgnoreMpcrawlerErrors() {
        /**
         * @inheritDoc
         */
        this.name = IgnoreMpcrawlerErrors.id;
    }
    /**
     * @inheritDoc
     */
    IgnoreMpcrawlerErrors.prototype.setupOnce = function () {
        core_1.addGlobalEventProcessor(function (event) {
            if (core_1.getCurrentHub().getIntegration(IgnoreMpcrawlerErrors) &&
                crossPlatform_1.appName === "wechat" &&
                crossPlatform_1.sdk.getLaunchOptionsSync) {
                var options = crossPlatform_1.sdk.getLaunchOptionsSync();
                if (options.scene === 1129) {
                    return null;
                }
            }
            return event;
        });
    };
    /**
     * @inheritDoc
     */
    IgnoreMpcrawlerErrors.id = "IgnoreMpcrawlerErrors";
    return IgnoreMpcrawlerErrors;
}());
exports.IgnoreMpcrawlerErrors = IgnoreMpcrawlerErrors;
//# sourceMappingURL=ignoreMpcrawlerErrors.js.map