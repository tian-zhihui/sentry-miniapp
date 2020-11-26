import { __assign, __extends, __read, __spread } from "tslib";
import { API, BaseClient } from "@sentry/core";
import { getGlobalObject, logger } from "@sentry/utils";
import { MiniappBackend } from "./backend";
import { SDK_NAME, SDK_VERSION } from "./version";
/**
 * The Sentry Miniapp SDK Client.
 *
 * @see MiniappOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
var MiniappClient = /** @class */ (function (_super) {
    __extends(MiniappClient, _super);
    /**
     * Creates a new Miniapp SDK instance.
     *
     * @param options Configuration options for this SDK.
     */
    function MiniappClient(options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, MiniappBackend, options) || this;
    }
    /**
     * @inheritDoc
     */
    MiniappClient.prototype._prepareEvent = function (event, scope, hint) {
        event.platform = event.platform || "javascript";
        event.sdk = __assign(__assign({}, event.sdk), { name: SDK_NAME, packages: __spread(((event.sdk && event.sdk.packages) || []), [
                {
                    name: "npm:@sentry/miniapp",
                    version: SDK_VERSION
                }
            ]), version: SDK_VERSION });
        return _super.prototype._prepareEvent.call(this, event, scope, hint);
    };
    /**
     * Show a report dialog to the user to send feedback to a specific event.
     * 向用户显示报告对话框以将反馈发送到特定事件。---> 小程序上暂时用不到&不考虑。
     *
     * @param options Set individual options for the dialog
     */
    MiniappClient.prototype.showReportDialog = function (options) {
        if (options === void 0) { options = {}; }
        // doesn't work without a document (React Native)
        var document = getGlobalObject().document;
        if (!document) {
            return;
        }
        if (!this._isEnabled()) {
            logger.error("Trying to call showReportDialog with Sentry Client is disabled");
            return;
        }
        var dsn = options.dsn || this.getDsn();
        if (!options.eventId) {
            logger.error("Missing `eventId` option in showReportDialog call");
            return;
        }
        if (!dsn) {
            logger.error("Missing `Dsn` option in showReportDialog call");
            return;
        }
        var script = document.createElement("script");
        script.async = true;
        script.src = new API(dsn).getReportDialogEndpoint(options);
        if (options.onLoad) {
            script.onload = options.onLoad;
        }
        (document.head || document.body).appendChild(script);
    };
    return MiniappClient;
}(BaseClient));
export { MiniappClient };
//# sourceMappingURL=client.js.map