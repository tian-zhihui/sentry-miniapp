import { Integration } from "@sentry/types";
/** JSDoc */
interface GlobalHandlersIntegrations {
    onerror: boolean;
    onunhandledrejection: boolean;
    onpagenotfound: boolean;
    onmemorywarning: boolean;
}
/** Global handlers */
export declare class GlobalHandlers implements Integration {
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * @inheritDoc
     */
    static id: string;
    /** JSDoc */
    private readonly _options;
    /** JSDoc */
    private _onErrorHandlerInstalled;
    /** JSDoc */
    private _onUnhandledRejectionHandlerInstalled;
    /** JSDoc */
    private _onPageNotFoundHandlerInstalled;
    /** JSDoc */
    private _onMemoryWarningHandlerInstalled;
    /** JSDoc */
    constructor(options?: GlobalHandlersIntegrations);
    /**
     * @inheritDoc
     */
    setupOnce(): void;
    /** JSDoc */
    private _installGlobalOnErrorHandler;
    /** JSDoc */
    private _installGlobalOnUnhandledRejectionHandler;
    /** JSDoc */
    private _installGlobalOnPageNotFoundHandler;
    /** JSDoc */
    private _installGlobalOnMemoryWarningHandler;
}
export {};
//# sourceMappingURL=globalhandlers.d.ts.map