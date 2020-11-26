import { Integration } from "@sentry/types";
/** JSDoc */
interface RouterIntegrations {
    enable?: boolean;
}
/** UserAgent */
export declare class Router implements Integration {
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
    /**
     * @inheritDoc
     */
    constructor(options?: RouterIntegrations);
    /**
     * @inheritDoc
     */
    setupOnce(): void;
}
export {};
//# sourceMappingURL=router.d.ts.map