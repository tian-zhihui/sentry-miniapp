import { __assign, __extends } from "tslib";
import { BaseBackend } from "@sentry/core";
import { Severity } from "@sentry/types";
import { addExceptionMechanism, resolvedSyncPromise } from '@sentry/utils';
import { eventFromString, eventFromUnknownInput } from './eventbuilder';
import { XHRTransport } from "./transports/index";
/**
 * The Sentry Browser SDK Backend.
 * @hidden
 */
var MiniappBackend = /** @class */ (function (_super) {
    __extends(MiniappBackend, _super);
    function MiniappBackend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    MiniappBackend.prototype._setupTransport = function () {
        if (!this._options.dsn) {
            // We return the noop transport here in case there is no Dsn.
            return _super.prototype._setupTransport.call(this);
        }
        var transportOptions = __assign(__assign({}, this._options.transportOptions), { dsn: this._options.dsn });
        if (this._options.transport) {
            return new this._options.transport(transportOptions);
        }
        return new XHRTransport(transportOptions);
    };
    /**
     * @inheritDoc
     */
    MiniappBackend.prototype.eventFromException = function (exception, hint) {
        var syntheticException = (hint && hint.syntheticException) || undefined;
        var event = eventFromUnknownInput(exception, syntheticException, {
            attachStacktrace: this._options.attachStacktrace,
        });
        addExceptionMechanism(event, {
            handled: true,
            type: 'generic',
        });
        event.level = Severity.Error;
        if (hint && hint.event_id) {
            event.event_id = hint.event_id;
        }
        return resolvedSyncPromise(event);
    };
    /**
     * @inheritDoc
     */
    MiniappBackend.prototype.eventFromMessage = function (message, level, hint) {
        if (level === void 0) { level = Severity.Info; }
        var syntheticException = (hint && hint.syntheticException) || undefined;
        var event = eventFromString(message, syntheticException, {
            attachStacktrace: this._options.attachStacktrace,
        });
        event.level = level;
        if (hint && hint.event_id) {
            event.event_id = hint.event_id;
        }
        return resolvedSyncPromise(event);
    };
    return MiniappBackend;
}(BaseBackend));
export { MiniappBackend };
//# sourceMappingURL=backend.js.map