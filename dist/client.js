Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniappClient = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@sentry/core");
var backend_1 = require("./backend");
var version_1 = require("./version");
/**
 * The Sentry Miniapp SDK Client.
 *
 * @see MiniappOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
var MiniappClient = /** @class */ (function (_super) {
    tslib_1.__extends(MiniappClient, _super);
    /**
     * Creates a new Miniapp SDK instance.
     *
     * @param options Configuration options for this SDK.
     */
    function MiniappClient(options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, backend_1.MiniappBackend, options) || this;
    }
    /**
     * @inheritDoc
     */
    MiniappClient.prototype._prepareEvent = function (event, scope, hint) {
        event.platform = event.platform || "javascript";
        event.sdk = tslib_1.__assign(tslib_1.__assign({}, event.sdk), { name: version_1.SDK_NAME, packages: tslib_1.__spread(((event.sdk && event.sdk.packages) || []), [
                {
                    name: "npm:@sentry/miniapp",
                    version: version_1.SDK_VERSION
                }
            ]), version: version_1.SDK_VERSION });
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
        console.log('sentry-miniapp 暂未实现该方法', options);
    };
    return MiniappClient;
}(core_1.BaseClient));
exports.MiniappClient = MiniappClient;
//# sourceMappingURL=client.js.map