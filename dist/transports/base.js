Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTransport = void 0;
var core_1 = require("@sentry/core");
var utils_1 = require("@sentry/utils");
/** Base Transport class implementation */
var BaseTransport = /** @class */ (function () {
    function BaseTransport(options) {
        this.options = options;
        /** A simple buffer holding all requests. */
        this._buffer = utils_1.makePromiseBuffer(30);
        this.url = new core_1.API(this.options.dsn).getStoreEndpointWithUrlEncodedAuth();
    }
    /**
     * @inheritDoc
     */
    BaseTransport.prototype.sendEvent = function (_) {
        throw new utils_1.SentryError("Transport Class has to implement `sendEvent` method");
    };
    /**
     * @inheritDoc
     */
    BaseTransport.prototype.close = function (timeout) {
        return this._buffer.drain(timeout);
    };
    return BaseTransport;
}());
exports.BaseTransport = BaseTransport;
//# sourceMappingURL=base.js.map