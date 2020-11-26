/**
 * 小程序平台 SDK 接口
 */
interface SDK {
    request: Function;
    httpRequest?: Function;
    getSystemInfoSync: Function;
    onError?: Function;
    onUnhandledRejection?: Function;
    onPageNotFound?: Function;
    onMemoryWarning?: Function;
    getLaunchOptionsSync?: Function;
}
/**
 * 小程序平台 接口
 */
declare type AppName = "wechat" | "alipay" | "bytedance" | "dingtalk" | "qq" | "swan" | "unknown";
declare const sdk: SDK;
declare const appName: AppName;
export { sdk, appName };
//# sourceMappingURL=crossPlatform.d.ts.map