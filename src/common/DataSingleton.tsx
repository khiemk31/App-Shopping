export enum DataSingletonKey {
  USER_INFO = 'userInfo',
  SSO_ACCESS_TOKEN = 'accessToken',
  USER_INFO_FULL = 'userInfoFull',
  FIREBASE_KEY = 'FIREBASE_KEY',
  IS_APP_PAUSE = 'IS_APP_PAUSE',
  TIME_REQUEST_TOKEN = 'TIME_REQUEST_TOKEN',
  IS_CAN_LOAD = 'IS_CAN_LOAD',
  DATA_NOTIFY_FIREBASE = 'DATA_NOTIFY_FIREBASE',
  IS_CLICK_NOTIFY = 'IS_CLICK_NOTIFY',
  USER_FULL_NAME = 'userFullName',
  USER_POSITION = 'userPosition',
  USER_NAME = 'USER_NAME',
  PASSWORD = 'PASSWORD',
  EMPLOYEE_CODE = 'EMPLOYEE_CODE',
  PHONE_NUMBER = 'PHONE_NUMBER',
  AVATAR = 'AVATAR',
  DESCRIPTION = 'DESCRIPTION',
  PERMISSION_ROLE = 'PERMISSION_ROLE',
  NUMBER_NOTIFICATION = 'NUMBER_NOTIFICATION',
  REQUIRE_SUPPORTED_PERMISSION = 'REQUIRE_SUPPORTED_PERMISSION',
  ORGANIZATION_NAME = 'ORGANIZATION_NAME',
  DEVICE_ID = 'DEVICE_ID',
}
/**
 * DataSingleton using to save static data that used on current session
 */
class DataSingleton {
  private dataManager: any = {};

  /**
   *
   * @param key
   * @param value
   */
  setData(key: string, value: any, callback?: () => void) {
    this.dataManager[key] = value;
    if (callback) {
      callback();
    }
  }

  /**
   *
   * @param key
   *  Key of value
   * @param defaultValue
   *  Return defaultValue if key not found
   */
  getData<T>(key: string, defaultValue: any) {
    if (this.dataManager[key]) {
      var value: T = this.dataManager[key];
      return value;
    } else {
      return defaultValue;
    }
  }

  /**
   * Delete all value on data singleton
   */
  clearAll() {
    try {
      this.dataManager = [];
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @param key
   *  Key of value that deleting
   */
  clear(key: string) {
    try {
      Object.keys(this.dataManager).map((value, index) => {
        if (value == key) {
          this.dataManager.splice(index, 1);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new DataSingleton();
