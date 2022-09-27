import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
interface DeviceObject {
  androidId?: string;
  appName?: string;
  brand?: string;
  buildNumber?: string;
  bundleId?: string;
  deviceId?: string;
  deviceType?: string;
  deviceName?: string;
  deviceToken?: string;
  systemVersion?: string;
  systemName?: string;
  version?: string;
  manufacturer?: string;
  uniqueId?: string;
  ipAddress?: string;
  model?: any;
  readableVersion?: string;
}
export async function getDeviceinfor() {
  let deviceInfo: DeviceObject = {};
  try {
    try {
      deviceInfo.ipAddress = (await DeviceInfo.getIpAddress()) ?? '127.0.0.1';
    } catch (error) {
      deviceInfo.ipAddress = '127.0.0.1';
    }
    deviceInfo.appName = DeviceInfo.getApplicationName();
    deviceInfo.brand = DeviceInfo.getBrand();
    deviceInfo.buildNumber = DeviceInfo.getBuildNumber();
    deviceInfo.bundleId = DeviceInfo.getBundleId();
    deviceInfo.deviceId = DeviceInfo.getDeviceId();
    deviceInfo.systemVersion = DeviceInfo.getSystemVersion();
    deviceInfo.version = DeviceInfo.getVersion();
    deviceInfo.deviceType = DeviceInfo.getDeviceType();
    deviceInfo.model = DeviceInfo.getModel();
    deviceInfo.readableVersion = DeviceInfo.getReadableVersion();
    deviceInfo.systemName = DeviceInfo.getSystemName();
    deviceInfo.uniqueId = await DeviceInfo.getUniqueId();
    if (Platform.OS == 'android') {
      deviceInfo.androidId = await DeviceInfo.getAndroidId();
    }
    deviceInfo.deviceName = await DeviceInfo.getDeviceName();
    deviceInfo.deviceToken = await DeviceInfo.getDeviceToken();
    deviceInfo.manufacturer = await DeviceInfo.getManufacturer();
  } catch (error) {
    console.log('Error', error);
  }
  return deviceInfo;
}
