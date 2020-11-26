/**
 * 获取跨平台的 SDK
 */
var getSDK = function () {
    var currentSdk = {
        // tslint:disable-next-line: no-empty
        request: function () { },
        // tslint:disable-next-line: no-empty
        httpRequest: function () { },
        // tslint:disable-next-line: no-empty
        getSystemInfoSync: function () { },
    };
    if (typeof wx === "object") {
        // tslint:disable-next-line: no-unsafe-any
        currentSdk = wx;
    }
    else if (typeof my === "object") {
        // tslint:disable-next-line: no-unsafe-any
        currentSdk = my;
    }
    else if (typeof tt === "object") {
        // tslint:disable-next-line: no-unsafe-any
        currentSdk = tt;
    }
    else if (typeof dd === "object") {
        // tslint:disable-next-line: no-unsafe-any
        currentSdk = dd;
    }
    else if (typeof qq === "object") {
        // tslint:disable-next-line: no-unsafe-any
        currentSdk = qq;
    }
    else if (typeof swan === "object") {
        // tslint:disable-next-line: no-unsafe-any
        currentSdk = swan;
    }
    else if (typeof uni === "object") {
        // tslint:disable-next-line: no-unsafe-any
        currentSdk = uni;
    }
    else {
        try {
            // 如果已经有Taro依赖，就使用Taro对象
            // tslint:disable-next-line: no-implicit-dependencies
            // tslint:disable-next-line: no-unsafe-any
            currentSdk = require('@tarojs/taro');
        }
        catch (e) {
            throw new Error("sentry-miniapp 暂不支持此平台");
        }
    }
    return currentSdk;
};
/**
 * 获取平台名称
 */
var getAppName = function () {
    var currentAppName = "unknown";
    if (typeof wx === "object") {
        currentAppName = "wechat";
    }
    else if (typeof my === "object") {
        currentAppName = "alipay";
    }
    else if (typeof tt === "object") {
        currentAppName = "bytedance";
    }
    else if (typeof dd === "object") {
        currentAppName = "dingtalk";
    }
    else if (typeof qq === "object") {
        currentAppName = "qq";
    }
    else if (typeof swan === "object") {
        currentAppName = "swan";
    }
    return currentAppName;
};
var sdk = getSDK();
var appName = getAppName();
export { sdk, appName };
//# sourceMappingURL=crossPlatform.js.map