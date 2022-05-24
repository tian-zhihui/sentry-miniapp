import { __extends } from "tslib";
import { eventStatusFromHttpCode } from '@sentry/utils';
import { sdk } from "../crossPlatform";
import { BaseTransport } from "./base";
/** `XHR` based transport */
var XHRTransport = /** @class */ (function (_super) {
    __extends(XHRTransport, _super);
    function XHRTransport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    XHRTransport.prototype.sendEvent = function (event) {
        var _this = this;
        var request = sdk.request || sdk.httpRequest;
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
                        status: eventStatusFromHttpCode(res.statusCode)
                    });
                },
                fail: function (error) {
                    reject(error);
                }
            });
        }); });
    };
    return XHRTransport;
}(BaseTransport));
export { XHRTransport };
//# sourceMappingURL=xhr.js.map