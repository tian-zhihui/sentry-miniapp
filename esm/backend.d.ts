import { BaseBackend } from "@sentry/core";
import { Event, EventHint, Options, Severity, Transport } from "@sentry/types";
/**
 * Configuration options for the Sentry Miniapp SDK.
 * Sentry Miniapp SDK 的配置选项。
 * @see MiniappClient for more information.
 */
export interface MiniappOptions extends Options {
    /**
     * A pattern for error URLs which should not be sent to Sentry.
     * To whitelist certain errors instead, use {@link Options.whitelistUrls}.
     * By default, all errors will be sent.
     */
    blacklistUrls?: Array<string | RegExp>;
    /**
     * A pattern for error URLs which should exclusively be sent to Sentry.
     * This is the opposite of {@link Options.blacklistUrls}.
     * By default, all errors will be sent.
     */
    whitelistUrls?: Array<string | RegExp>;
}
/**
 * The Sentry Browser SDK Backend.
 * @hidden
 */
export declare class MiniappBackend extends BaseBackend<MiniappOptions> {
    /**
     * @inheritDoc
     */
    protected _setupTransport(): Transport;
    /**
     * @inheritDoc
     */
    eventFromException(exception: any, hint?: EventHint): PromiseLike<Event>;
    /**
     * @inheritDoc
     */
    eventFromMessage(message: string, level?: Severity, hint?: EventHint): PromiseLike<Event>;
}
//# sourceMappingURL=backend.d.ts.map