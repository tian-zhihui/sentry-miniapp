import { __assign, __read } from "tslib";
import { addGlobalEventProcessor, getCurrentHub } from "@sentry/core";
import { appName as currentAppName, sdk } from "../crossPlatform";
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
        addGlobalEventProcessor(function (event) {
            if (getCurrentHub().getIntegration(System)) {
                try {
                    var systemInfo = sdk.getSystemInfoSync();
                    var _a = systemInfo.SDKVersion, SDKVersion = _a === void 0 ? "0.0.0" : _a, batteryLevel = systemInfo.batteryLevel, // 微信小程序
                    currentBattery = systemInfo.currentBattery, // 支付宝小程序、 钉钉小程序
                    battery = systemInfo.battery, // 字节跳动小程序
                    brand = systemInfo.brand, language = systemInfo.language, model = systemInfo.model, pixelRatio = systemInfo.pixelRatio, platform = systemInfo.platform, screenHeight = systemInfo.screenHeight, screenWidth = systemInfo.screenWidth, statusBarHeight = systemInfo.statusBarHeight, system = systemInfo.system, version = systemInfo.version, windowHeight = systemInfo.windowHeight, windowWidth = systemInfo.windowWidth, app = systemInfo.app, // 支付宝小程序
                    appName = systemInfo.appName, // 字节跳动小程序
                    fontSizeSetting = systemInfo.fontSizeSetting;
                    var _b = __read(system.split(" "), 2), systemName = _b[0], systemVersion = _b[1];
                    return __assign(__assign({}, event), { contexts: __assign(__assign({}, event.contexts), { device: {
                                brand: brand,
                                battery_level: batteryLevel || currentBattery || battery || 0,
                                model: model,
                                screen_dpi: pixelRatio
                            }, os: {
                                name: systemName || system,
                                version: systemVersion || system
                            }, extra: __assign({ SDKVersion: SDKVersion,
                                language: language,
                                platform: platform,
                                screenHeight: screenHeight,
                                screenWidth: screenWidth,
                                statusBarHeight: statusBarHeight,
                                version: version,
                                windowHeight: windowHeight,
                                windowWidth: windowWidth,
                                fontSizeSetting: fontSizeSetting, app: app || appName || currentAppName }, systemInfo) }) });
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
export { System };
//# sourceMappingURL=system.js.map