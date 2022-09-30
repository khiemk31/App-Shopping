import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import moment from 'moment';
import {NativeModules, PermissionsAndroid} from 'react-native';
import {escapeRegExp} from 'lodash';
import ToastOver from 'react-native-simple-toast';
export const nonAccentVietnamese = (str: string) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
};
export const setOnllyNumber = (str: string) => {
  str = str.toLowerCase();
  str = str.replace(/[- #*;,.<>\{\}\[\]\\\/+()]/gi, '');
  return str;
};

export const setOnllyTextAndNumber = (str: string) => {
  str = str.replace(
    /[-#*;₫¥€'"~:•,“‘|.<>!@$%^&_?=`√π÷×¶∆£¢°°℅™®©\{\}\[\]\\\/+()]/gi,
    '',
  );
  return str;
};

export const setTextNumber = (str: string) => {
  str = str.toLowerCase();
  str = str.replace(/[^0-9.]/g, '');
  return str;
};

export enum FileSizeUnit {
  MB = 'MB',
  KB = 'KB',
  GB = 'GB',
  TB = 'TB',
}

export const getNumberString = (str: string) => {
  if (str == undefined) {
    return '';
  }
  return str.replace(/\D/g, '');
};

export const subStringLastChar = (str: string, numChar: number) => {
  const lastChar = str.substring(str.length - numChar, str.length);
  return lastChar;
};

export const filterText = (
  text: string,
  stringFilter: string,
  keepInStringFilter: boolean,
) => {
  if (text.length > 0) {
    var strReturn = String(text);
    var str = String(text);
    var filter = stringFilter;
    var isContainsOtherKey = false;

    for (var i = 0; i < str.length; i++) {
      var key = str[i];
      if (keepInStringFilter) {
        if (!(String(filter).indexOf(key) != -1)) {
          strReturn = String(strReturn).replace(key, '');
          isContainsOtherKey = true;
        }
      } else {
        if (String(filter).indexOf(key) != -1) {
          strReturn = String(strReturn).replace(key, '');
          isContainsOtherKey = true;
        }
      }
    }

    if (isContainsOtherKey) {
      return strReturn;
    }
  }

  return text;
};

export const getBSSID = async () => {
  const BssidModule = NativeModules.BssidModule;
  const bssid: string = await BssidModule.getWifiSsid();
  if (bssid) {
    return bssid;
  }
  return '';
};

export const getDeviceId = async () => {
  const UniqueDeviceID = NativeModules.UniqueDeviceIDModule;
  let deviceId = await UniqueDeviceID.getDeviceId();
  return deviceId;
};
export const getRSAKeys = async (): Promise<{
  public: string;
  private: string;
}> => {
  const UniqueDeviceID = NativeModules.UniqueDeviceIDModule;
  const keys = await UniqueDeviceID.getRSAKeys();
  let _keys = JSON.parse(keys);
  return _keys;
};

export const validateEmail = (email: string) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
export const replaceHttpUrl = (strs: string) => {
  let urlnew = '';

  var urlRegexCheck =
    /(?:(http|https|Http|Https|rtsp|Rtsp)):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi;

  strs.replace(urlRegexCheck, function (url) {
    urlnew = url;
    return urlnew;
  });

  if (!urlnew) {
    var urlRegex =
      /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
    strs.replace(urlRegex, function (url) {
      urlnew = url;
      return urlnew;
    });
  }
  return urlnew;
};

export const formatDate = (date: any) => {
  return moment(new Date(date)).format('DD/MM/YYYY');
};

export const formatTimestampToDate = (timestamp: number, format: string) => {
  return moment(new Date(timestamp)).format(format);
};

export const formatDatetoString = (date: Date) => {
  return moment(date).format('DD/MM/YYYY');
};
export const utcDateToString = (momentInUTC: any): string => {
  let s = moment(momentInUTC * 1000)
    .utc()
    .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  return s;
};
export const stringDateToString = (date: string) => {
  return moment(date).format('DD/MM/YYYY');
};

export function formatBytes(bytes: any, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (bytes / Math.pow(k, i)).toFixed(dm) + ' ' + sizes[i];
}

export const moneyFomat = (price: number) => {
  return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};
const colorList = ['#F8E4CE'];
export const getColorRandom = () => {
  return colorList[Math.floor(Math.random() * colorList.length)];
};

export const randomRangeWithMin = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min));
};

export const randomRangeWithMax = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + 1;
};

export const randomRange = (range: number) => {
  return Math.floor(Math.random() * range) + 1;
};

export const getMonday = (d: Date) => {
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
};

export const formatTimestamp = (value: any, format: string) => {
  return moment.unix(value / 1000).format(format);
};

export const checkNetWork = async () => {
  let value: NetInfoState = await NetInfo.fetch();
  if (value && value.isConnected) {
    return true;
  }
  return false;
};

export const getTimestampFromDay = (numberDay: number) => {
  return numberDay * 24 * 60 * 60 * 1000;
};

/**
 *
 * @param size
 * @param fileUnit
 */
export const convertSizeOfFileToString = (
  size: number,
  fileUnit: FileSizeUnit,
) => {
  if (fileUnit == FileSizeUnit.KB) {
    return size > 1024
      ? (size / 1024).toFixed(2) + ' ' + FileSizeUnit.MB
      : size + ' ' + FileSizeUnit.KB;
  } else if (fileUnit == FileSizeUnit.MB) {
    return size > 1024
      ? (size / 1024).toFixed(2) + ' ' + FileSizeUnit.GB
      : size + ' ' + FileSizeUnit.MB;
  } else if (fileUnit == FileSizeUnit.GB) {
    return size > 1024
      ? (size / 1024).toFixed(2) + ' ' + FileSizeUnit.TB
      : size + ' ' + FileSizeUnit.GB;
  } else if (fileUnit == FileSizeUnit.TB) {
    return size + ' ' + FileSizeUnit.TB;
  }
};

/**
 *
 * @param currentLink
 * @param replaceIP
 */
export const replaceDownloadIP = (currentLink: string, replaceIP: string) => {
  if (currentLink.includes(replaceIP)) {
    return currentLink;
  }
  let downLinkArr = currentLink.split(':');
  if (downLinkArr.length >= 3) {
    // Đảm bảo chứa 3 phần http, ip, port+path
    let linkPath = '';
    let pathArr = downLinkArr[2].split('/');
    let currentPortLenght = 0;
    if (pathArr.length > 0) {
      currentPortLenght = pathArr[0].length;
    }
    if (downLinkArr[2].length > currentPortLenght) {
      linkPath = downLinkArr[2].substring(
        currentPortLenght,
        downLinkArr[2].length,
      );
    }
    return downLinkArr[0] + '://' + replaceIP + linkPath;
  }
  return currentLink;
};

/**
 *
 * @param filePath
 */
export const installApp = (filePath: string) => {
  const appInstaller = NativeModules.AppInstallerModule;
  appInstaller.install(filePath);
};

export const isImage = (path: string) => {
  if (path.length != 0) {
    let filePath = path.toLowerCase();
    if (
      filePath.includes('.jpg') ||
      filePath.includes('.jpeg') ||
      filePath.includes('.bmp') ||
      filePath.includes('.gif') ||
      filePath.includes('.png') ||
      filePath.includes('.HEIC') || // HEIC for iOS
      filePath.includes('.heic')
    ) {
      return true;
    }
  }
  return false;
};

export const isVideo = (path: string) => {
  if (path.length != 0) {
    let filePath = path.toLowerCase();
    if (
      filePath.includes('.mp4') ||
      filePath.includes('.mkv') ||
      filePath.includes('.flv') ||
      filePath.includes('.avi') ||
      filePath.includes('.wmv') ||
      filePath.includes('.mov') ||
      filePath.includes('.3gp')
    ) {
      return true;
    }
  }
  return false;
};

export const showToastOver = (message: string, duration?: number) => {
  ToastOver.show(message, duration);
};

export const capitalizeFirstLetter = (string: string) => {
  if (!string) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**************************************************************************************************************
 *
 * Handler & Dispatcher using to setup callback listener for components
 *
 **************************************************************************************************************/
export type Handler<E> = (event: E) => void;
export class EventDispatcher<E> {
  private handlers: Handler<E>[] = [];
  fire(event: E) {
    for (let h of this.handlers) h(event);
  }
  register(handler: Handler<E>) {
    this.handlers.push(handler);
  }
  clear() {
    this.handlers = [];
  }
  clearHandler(handler: Handler<E>) {
    this.handlers = this.handlers.filter(item => {
      return item != handler;
    });
  }
}
export const validateUrl = (url: string) => {
  if (!!url && url.length > 0) {
    if (url.startsWith('http')) {
      return true;
    }
  }
  return false;
};

export const replaceAll = (str: string, find: string, replace: string) => {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

/**
 *
 * @param sms
 */
export const getOtpFromString = (sms: string) => {
  let otp = '';
  let regex = /[0-9]{6}/g;
  let otps = sms.match(regex);
  if (otps && otps.length == 1) {
    otp = otps[0];
  }
  return otp;
};
export const getParamFromUrl = (url: string) => {
  var regex = /[?&]([^=#]+)=([^&#]*)/g,
    params: any = {},
    match;
  while ((match = regex.exec(url))) {
    params[match[1]] = match[2];
  }
  return params;
};

export const checkTextEmpty = (text: string) => {
  return text.length > 0;
};

export const getNameFile = (path: string) => {
  let fileName: string = '';
  if (path.length > 0) {
    const word = path.split('/');
    fileName = word[word.length - 1] ?? '';
  } else {
    fileName = '';
  }
  return fileName;
};

export const checkPermissions = async (platform: string) => {
  if (platform === 'android') {
    try {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]).then(result => {
        if (
          result['android.permission.READ_EXTERNAL_STORAGE'] &&
          result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
        ) {
          return true;
        } else {
          return false;
        }
      });
    } catch (err) {
      return false;
    }
  } else {
    return true;
  }
};

export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;

  // returns: "x", "xx", "xxx", "xxxx"
  if (cvLength < 5) return currentValue;

  // returns: "xxxx", "xxxx x", "xxxx xx", "xxxx xxx",
  if (cvLength < 8)
    return `${currentValue.slice(0, 4)} ${currentValue.slice(4)}`;

  // returns: "xxxx xxx-", xxxx xxx-x", "xxxx xxx-xx", "xxxx xxx-xxx", "xxxx xxx-xxxx"
  return `${currentValue.slice(0, 4)} ${currentValue.slice(
    4,
    7,
  )} ${currentValue.slice(7, 11)}`;
};
