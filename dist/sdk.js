Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = exports.close = exports.flush = exports.lastEventId = exports.showReportDialog = exports.init = exports.defaultIntegrations = void 0;
var core_1 = require("@sentry/core");
var utils_1 = require("@sentry/utils");
var client_1 = require("./client");
var helpers_1 = require("./helpers");
var index_1 = require("./integrations/index");
exports.defaultIntegrations = [
    new core_1.Integrations.InboundFilters(),
    new core_1.Integrations.FunctionToString(),
    new index_1.TryCatch(),
    new index_1.GlobalHandlers(),
    new index_1.LinkedErrors(),
    new index_1.System(),
    new index_1.Router(),
    new index_1.IgnoreMpcrawlerErrors(),
];
/**
 * The Sentry Miniapp SDK Client.
 *
 * To use this SDK, call the {@link init} function as early as possible when
 * launching the app. To set context information or send manual events, use
 * the provided methods.
 *
 * @example
 * ```
 * import { init } from '@sentry/miniapp';
 *
 * init({
 *   dsn: '__DSN__',
 *   // ...
 * });
 * ```
 *
 * @example
 * ```
 * import { configureScope } from '@sentry/miniapp';
 *
 * configureScope((scope: Scope) => {
 *   scope.setExtra({ battery: 0.7 });
 *   scope.setTag({ user_mode: 'admin' });
 *   scope.setUser({ id: '4711' });
 * });
 * ```
 *
 * @example
 * ```
 * import { addBreadcrumb } from '@sentry/miniapp';
 *
 * addBreadcrumb({
 *   message: 'My Breadcrumb',
 *   // ...
 * });
 * ```
 *
 * @example
 * ```
 * import * as Sentry from '@sentry/miniapp';
 *
 * Sentry.captureMessage('Hello, world!');
 * Sentry.captureException(new Error('Good bye'));
 * Sentry.captureEvent({
 *   message: 'Manual',
 *   stacktrace: [
 *     // ...
 *   ],
 * });
 * ```
 *
 * @see {@link MiniappOptions} for documentation on configuration options.
 */
function init(options) {
    if (options === void 0) { options = {}; }
    // 如果将 options.defaultIntegrations 设置为 false，则不会添加默认集成，否则将在内部将其设置为建议的默认集成。
    // tslint:disable-next-line: strict-comparisons
    if (options.defaultIntegrations === undefined) {
        options.defaultIntegrations = exports.defaultIntegrations;
    }
    // https://github.com/lizhiyao/sentry-miniapp/issues/23
    options.normalizeDepth = options.normalizeDepth || 5;
    core_1.initAndBind(client_1.MiniappClient, options);
}
exports.init = init;
/**
 * Present the user with a report dialog.
 * 向用户显示报告对话框。小程序上暂时不考虑实现该功能。
 *
 * @param options Everything is optional, we try to fetch all info need from the global scope.
 */
function showReportDialog(options) {
    if (options === void 0) { options = {}; }
    if (!options.eventId) {
        options.eventId = core_1.getCurrentHub().lastEventId();
    }
    var client = core_1.getCurrentHub().getClient();
    if (client) {
        client.showReportDialog(options);
    }
}
exports.showReportDialog = showReportDialog;
/**
 * This is the getter for lastEventId. 获取 lastEventId。
 *
 * @returns The last event id of a captured event.
 */
function lastEventId() {
    return core_1.getCurrentHub().lastEventId();
}
exports.lastEventId = lastEventId;
/**
 * A promise that resolves when all current events have been sent.
 * If you provide a timeout and the queue takes longer to drain the promise returns false.
 * 在发送所有当前事件时会变为 resolved 状态的 promise。如果提供了一个超时时间并且队列需要更长时间来消耗，则 promise 将返回 false。
 *
 * @param timeout Maximum time in ms the client should wait.
 */
function flush(timeout) {
    var client = core_1.getCurrentHub().getClient();
    if (client) {
        return client.flush(timeout);
    }
    return utils_1.resolvedSyncPromise(false);
}
exports.flush = flush;
/**
 * A promise that resolves when all current events have been sent.
 * If you provide a timeout and the queue takes longer to drain the promise returns false.
 *
 * @param timeout Maximum time in ms the client should wait.
 */
function close(timeout) {
    var client = core_1.getCurrentHub().getClient();
    if (client) {
        return client.close(timeout);
    }
    return utils_1.resolvedSyncPromise(false);
}
exports.close = close;
/**
 * Wrap code within a try/catch block so the SDK is able to capture errors.
 * 在 try / catch 块中包装代码，以便 SDK 能够捕获错误。
 * 实际上是 ./helpers 文件中 warp 方法的进一步封装。
 *
 * @param fn A function to wrap.
 *
 * @returns The result of wrapped function call.
 */
function wrap(fn) {
    // tslint:disable-next-line: no-unsafe-any
    return helpers_1.wrap(fn)();
}
exports.wrap = wrap;
//# sourceMappingURL=sdk.js.map