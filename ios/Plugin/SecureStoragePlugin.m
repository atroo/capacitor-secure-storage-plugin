#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(SecureStoragePlugin, "SecureStoragePlugin",
           CAP_PLUGIN_METHOD(set, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(get, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getAccessibility, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(keys, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(remove, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(clear, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getPlatform, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setStorageAdapter, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getStorageAdapter, CAPPluginReturnPromise);
)
