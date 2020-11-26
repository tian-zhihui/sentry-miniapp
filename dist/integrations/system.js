Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@sentry/core");
var crossPlatform_1 = require("../crossPlatform");
/** UserAgent */
var System = /** @class */ (function () {
    function System() {
        /**
         * @inheritDoc
         */
        this.name = System.id;
    }
    /**
     * @inheritDoc
     */
    System.prototype.setupOnce = function () {
        core_1.addGlobalEventProcessor(function (event) {
            if (core_1.getCurrentHub().getIntegration(System)) {
                try {
                    var systemInfo = crossPlatform_1.sdk.getSystemInfoSync();
                    var _a = systemInfo.SDKVersion, SDKVersion = _a === void 0 ? "0.0.0" : _a, batteryLevel = systemInfo.batteryLevel, // 微信小程序
                    currentBattery = systemInfo.currentBattery, // 支付宝小程序、 钉钉小程序
                    battery = systemInfo.battery, // 字节跳动小程序
                    brand = systemInfo.brand, language = systemInfo.language, model = systemInfo.model, pixelRatio = systemInfo.pixelRatio, platform = systemInfo.platform, screenHeight = systemInfo.screenHeight, screenWidth = systemInfo.screenWidth, statusBarHeight = systemInfo.statusBarHeight, system = systemInfo.system, version = systemInfo.version, windowHeight = systemInfo.windowHeight, windowWidth = systemInfo.windowWidth, wifiSignal = systemInfo.wifiSignal, // 字节跳动小程序
                    app = systemInfo.app, // 支付宝小程序
                    appName = systemInfo.appName, // 字节跳动小程序
                    storage = systemInfo.storage, // 支付宝小程序、 钉钉小程序
                    fontSizeSetting = systemInfo.fontSizeSetting // 支付宝小程序、 钉钉小程序、微信小程序
                    ;
                    var _b = tslib_1.__read(system.split(" "), 2), systemName = _b[0], systemVersion = _b[1];
                    return tslib_1.__assign(tslib_1.__assign({}, event), { contexts: tslib_1.__assign(tslib_1.__assign({}, event.contexts), { device: {
                                brand: brand,
                                battery_level: batteryLevel || currentBattery || battery,
                                model: model,
                                screen_dpi: pixelRatio
                            }, os: {
                                name: systemName || system,
                                version: systemVersion || system
                            }, extra: {
                                SDKVersion: SDKVersion,
                                language: language,
                                platform: platform,
                                screenHeight: screenHeight,
                                screenWidth: screenWidth,
                                statusBarHeight: statusBarHeight,
                                version: version,
                                windowHeight: windowHeight,
                                windowWidth: windowWidth,
                                wifiSignal: wifiSignal,
                                fontSizeSetting: fontSizeSetting,
                                storage: storage,
                                app: app || appName || crossPlatform_1.appName
                            } }) });
                }
                catch (e) {
                    console.warn("sentry-miniapp get system info fail: " + e);
                }
            }
            return event;
        });
    };
    /**
     * @inheritDoc
     */
    System.id = "System";
    return System;
}());
exports.System = System;
//# sourceMappingURL=system.js.map