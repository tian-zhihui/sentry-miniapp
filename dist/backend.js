Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniappBackend = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@sentry/core");
var types_1 = require("@sentry/types");
var utils_1 = require("@sentry/utils");
var eventbuilder_1 = require("./eventbuilder");
var index_1 = require("./transports/index");
/**
 * The Sentry Browser SDK Backend.
 * @hidden
 */
var MiniappBackend = /** @class */ (function (_super) {
    tslib_1.__extends(MiniappBackend, _super);
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
        var transportOptions = tslib_1.__assign(tslib_1.__assign({}, this._options.transportOptions), { dsn: this._options.dsn });
        if (this._options.transport) {
            return new this._options.transport(transportOptions);
        }
        return new index_1.XHRTransport(transportOptions);
    };
    /**
     * @inheritDoc
     */
    MiniappBackend.prototype.eventFromException = function (exception, hint) {
        var syntheticException = (hint && hint.syntheticException) || undefined;
        var event = eventbuilder_1.eventFromUnknownInput(exception, syntheticException, {
            attachStacktrace: this._options.attachStacktrace,
        });
        utils_1.addExceptionMechanism(event, {
            handled: true,
            type: 'generic',
        });
        event.level = types_1.Severity.Error;
        if (hint && hint.event_id) {
            event.event_id = hint.event_id;
        }
        return utils_1.resolvedSyncPromise(event);
    };
    /**
     * @inheritDoc
     */
    MiniappBackend.prototype.eventFromMessage = function (message, level, hint) {
        if (level === void 0) { level = types_1.Severity.Info; }
        var syntheticException = (hint && hint.syntheticException) || undefined;
        var event = eventbuilder_1.eventFromString(message, syntheticException, {
            attachStacktrace: this._options.attachStacktrace,
        });
        event.level = level;
        if (hint && hint.event_id) {
            event.event_id = hint.event_id;
        }
        return utils_1.resolvedSyncPromise(event);
    };
    return MiniappBackend;
}(core_1.BaseBackend));
exports.MiniappBackend = MiniappBackend;
//# sourceMappingURL=backend.js.map