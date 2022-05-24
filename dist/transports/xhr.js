Object.defineProperty(exports, "__esModule", { value: true });
exports.XHRTransport = void 0;
var tslib_1 = require("tslib");
var utils_1 = require("@sentry/utils");
var crossPlatform_1 = require("../crossPlatform");
var base_1 = require("./base");
/** `XHR` based transport */
var XHRTransport = /** @class */ (function (_super) {
    tslib_1.__extends(XHRTransport, _super);
    function XHRTransport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    XHRTransport.prototype.sendEvent = function (event) {
        var _this = this;
        var request = crossPlatform_1.sdk.request || crossPlatform_1.sdk.httpRequest;
        return this._buffer.add(function () { return new Promise(function (resolve, reject) {
            // tslint:disable-next-line: no-unsafe-any
            request({
                url: _this.url,
                method: "POST",
                data: JSON.stringify(event),
                header: {
                    "content-type": "application/json"
                },
                success: function (res) {
                    resolve({
                        status: utils_1.eventStatusFromHttpCode(res.statusCode)
                    });
                },
                fail: function (error) {
                    reject(error);
                }
            });
        }); });
    };
    return XHRTransport;
}(base_1.BaseTransport));
exports.XHRTransport = XHRTransport;
//# sourceMappingURL=xhr.js.map