export { Breadcrumb, BreadcrumbHint, Request, SdkInfo, Event, EventHint, EventStatus, Exception, Response, Severity, StackFrame, Stacktrace, Thread, User, } from "@sentry/types";
export { addGlobalEventProcessor, addBreadcrumb, captureException, captureEvent, captureMessage, configureScope, getHubFromCarrier, getCurrentHub, Hub, Scope, setContext, setExtra, setExtras, setTag, setTags, setUser, withScope } from "@sentry/core";
export { SDK_NAME, SDK_VERSION } from "./version";
export { defaultIntegrations, init, lastEventId, showReportDialog, flush, close, wrap } from "./sdk";
export { MiniappOptions } from "./backend";
export { MiniappClient, ReportDialogOptions } from "./client";
import * as Integrations from "./integrations/index";
import * as Transports from "./transports/index";
export { Integrations, Transports };
//# sourceMappingURL=index.d.ts.map