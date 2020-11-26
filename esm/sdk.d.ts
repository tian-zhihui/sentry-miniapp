import { Integrations as CoreIntegrations } from "@sentry/core";
import { MiniappOptions } from "./backend";
import { ReportDialogOptions } from "./client";
import { GlobalHandlers, IgnoreMpcrawlerErrors, LinkedErrors, Router, System, TryCatch } from "./integrations/index";
export declare const defaultIntegrations: (CoreIntegrations.FunctionToString | CoreIntegrations.InboundFilters | GlobalHandlers | TryCatch | LinkedErrors | System | Router | IgnoreMpcrawlerErrors)[];
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
export declare function init(options?: MiniappOptions): void;
/**
 * Present the user with a report dialog.
 * 向用户显示报告对话框。小程序上暂时不考虑实现该功能。
 *
 * @param options Everything is optional, we try to fetch all info need from the global scope.
 */
export declare function showReportDialog(options?: ReportDialogOptions): void;
/**
 * This is the getter for lastEventId. 获取 lastEventId。
 *
 * @returns The last event id of a captured event.
 */
export declare function lastEventId(): string | undefined;
/**
 * A promise that resolves when all current events have been sent.
 * If you provide a timeout and the queue takes longer to drain the promise returns false.
 * 在发送所有当前事件时会变为 resolved 状态的 promise。如果提供了一个超时时间并且队列需要更长时间来消耗，则 promise 将返回 false。
 *
 * @param timeout Maximum time in ms the client should wait.
 */
export declare function flush(timeout?: number): PromiseLike<boolean>;
/**
 * A promise that resolves when all current events have been sent.
 * If you provide a timeout and the queue takes longer to drain the promise returns false.
 *
 * @param timeout Maximum time in ms the client should wait.
 */
export declare function close(timeout?: number): PromiseLike<boolean>;
/**
 * Wrap code within a try/catch block so the SDK is able to capture errors.
 * 在 try / catch 块中包装代码，以便 SDK 能够捕获错误。
 * 实际上是 ./helpers 文件中 warp 方法的进一步封装。
 *
 * @param fn A function to wrap.
 *
 * @returns The result of wrapped function call.
 */
export declare function wrap(fn: Function): any;
//# sourceMappingURL=sdk.d.ts.map