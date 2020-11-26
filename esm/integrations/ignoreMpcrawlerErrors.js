import { addGlobalEventProcessor, getCurrentHub } from "@sentry/core";
import { appName, sdk } from "../crossPlatform";
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
        addGlobalEventProcessor(function (event) {
            if (getCurrentHub().getIntegration(IgnoreMpcrawlerErrors) &&
                appName === "wechat" &&
                sdk.getLaunchOptionsSync) {
                var options = sdk.getLaunchOptionsSync();
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
export { IgnoreMpcrawlerErrors };
//# sourceMappingURL=ignoreMpcrawlerErrors.js.map