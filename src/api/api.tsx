import moment from 'moment';
import Axios from 'axios';
import DataSingleton, {DataSingletonKey} from '../common/DataSingleton';
import RNFetchBlob from 'rn-fetch-blob';
import {mobileLoadingService} from '../components/Loading';
import {PopupEvent} from '../container/screens/base/App';
import strings from '../res/strings';
import NavigationService from '../container/screens/base/NavigationService';
import {NavigationState} from '@react-navigation/native';
import {Platform} from 'react-native';
import {getDeviceinfor} from '../utils/UtilsDevice';

export enum ResponseCode {
  SUCCESS = 'success',
}
/**
 * Some key for request headers
 */
export enum HeaderKeys {
  CONTENT_TYPE = 'Content-Type',
  AUTHEN = 'Authorization',
  TTNS_TOKEN = 'TTNS-TOKEN',
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  IS_MOBILE = 'isMobile',
  DATE = 'Date',
  SERVER = 'Server',
  TRANSFER_ENCODING = 'Transfer-Encoding',
  TOKEN = 'token',
  API_KEY = 'api-key',
  LANGUAGE = 'language',
  KEY = 'key',
  X_KEY = 'X-Gravitee-Api-Key',
  DEVICE_ID = 'device-id',
}
/**
 * Some default value for request headers
 * Using when params request is default value, otherwise passing the params from each other
 */
enum HeaderValue {
  CONTENT_TYPE1 = 'application/json',
  CONTENT_TYPE2 = 'application/json;charset=UTF-8',
  CONTENT_TYPE3 = 'application/x-www-form-urlencoded',
  CONTENT_TYPE4 = 'multipart/form-data',
  AUTHEN = 'Bearer 123',
  AUTHEN_1 = 'Bearer fgfgfg',
  SERVER = 'Apache-Coyote/1.1',
  TRANSFER_ENCODING = 'chunked',
  TTNS_TOKEN = 'TTNS',
  API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiVlRDT05ORUNUSU9OIiwibmFtZSI6IlZUQ09OTkVDVElPTiIsInBhc3N3b3JkIjpudWxsLCJBUElfVElNRSI6MTU4NjkxODI0MH0.v49aqYMzRnqRxzsAmu88fNuZB0dngh1gGBTmCs2UxGY',
}

/**
 * Define format type for params
 */
export enum BodyType {
  RAW, // Params request dạng json
  URLENCODED, // Params request dạng URLSearchParam (key: value)
  FORMDATA, //
  NONE, // Dữ liệu gửi lên đã được đóng gọi dạng object FormData, không cần chuyển đổi dữ liệu.
}

export enum FileUploadType {
  IMAGE = 'image/jpg',
}
const DEV_MODE = false;

const x_key = DEV_MODE ? '' : '';
let BASE_URL = DEV_MODE ? '' : '';
export const getUserInfo = () => {
  return DEV_MODE
    ? {
        x_key: '',
        fullname: DataSingleton.getData(DataSingletonKey.USER_FULL_NAME, ''),
        employeeCode: DataSingleton.getData(DataSingletonKey.EMPLOYEE_CODE, ''),
        phoneNumber: DataSingleton.getData(DataSingletonKey.PHONE_NUMBER, ''),
        avatar: DataSingleton.getData(DataSingletonKey.AVATAR, ''),
        description: DataSingleton.getData(DataSingletonKey.DESCRIPTION, ''),
        token: DataSingleton.getData(DataSingletonKey.SSO_ACCESS_TOKEN, ''),
        password: DataSingleton.getData(DataSingletonKey.PASSWORD, ''),
        role: DataSingleton.getData(DataSingletonKey.PERMISSION_ROLE, ''),
      }
    : {
        x_key: '',
        fullname: DataSingleton.getData(DataSingletonKey.USER_FULL_NAME, ''),
        employeeCode: DataSingleton.getData(DataSingletonKey.EMPLOYEE_CODE, ''),
        phoneNumber: DataSingleton.getData(DataSingletonKey.PHONE_NUMBER, ''),
        avatar: DataSingleton.getData(DataSingletonKey.AVATAR, ''),
        description: DataSingleton.getData(DataSingletonKey.DESCRIPTION, ''),
        token: DataSingleton.getData(DataSingletonKey.SSO_ACCESS_TOKEN, ''),
        password: DataSingleton.getData(DataSingletonKey.PASSWORD, ''),
        role: DataSingleton.getData(DataSingletonKey.PERMISSION_ROLE, ''),
      };
};
const URL_AVATAR = '';
var CancelToken = Axios.CancelToken;
export const getLinkAvatar = (empId: string) => {
  if (empId == null) return '';
  return BASE_URL + URL_AVATAR + empId;
};
class Api {
  /**
   * - Sử dụng để quản lý canceler cho các request, mỗi request sẽ có 1 canceler dùng để cancel request khi người dùng muốn chuyển
   * sang màn hình khác và không muốn xử lý tiếp tục ở màn hình hiện tại
   *
   * ==============================================
   *
   * - Khởi tạo sẵn 7 level màn hình trong stack, màn hình trong stack hiện tại max là 4, mỗi phần tử là 1 mảng các request trong
   * màn hình đó
   */
  cancelRequestController: any = [[], [], [], [], [], [], []];

  // Map lưu lại những request cần cancel trước khi thực hiện request mới
  mapRequestCancel: Map<string, any> = new Map();

  /**
   *
   * @param url
   */
  private requestGet(
    url: string,
    headers?: any,
    params?: any,
    isShowLoading?: boolean,
    fixURL?: string,
    errorResponse?: (error: any) => void,
    isCancelPreRequest?: boolean,
  ) {
    let urlRequest = fixURL ? fixURL + url : BASE_URL + url;
    console.log('=======> URL: ' + urlRequest);
    console.log('=======> PARAMS: ' + JSON.stringify(params ? params : {}));
    console.log('=======> HEADER: ' + JSON.stringify(headers ? headers : {}));
    mobileLoadingService.loading = isShowLoading ?? false;

    // Thực hiện cancel request với API có set isCancelPreRequest = true trước đó.
    if (
      isCancelPreRequest &&
      this.mapRequestCancel &&
      this.mapRequestCancel.size > 0
    ) {
      if (this.mapRequestCancel.has(url)) {
        let cancel = this.mapRequestCancel.get(url);
        cancel();
      }
    }

    return Axios.get(fixURL ? fixURL + url : BASE_URL + url, {
      headers: headers ? headers : {},
      params: params ? params : {},
      cancelToken: new CancelToken((cancel:any) => {
        // An executor function receives a cancel function as a parameter
        if (isCancelPreRequest) {
          this.mapRequestCancel.set(url, cancel);
        }
      }),
    })
      .then((res:any) => {
        mobileLoadingService.loading = false;
        if (res.data) {
          console.log('=======> RESPONSE: ' + JSON.stringify(res.data));
          return res.data;
        } else {
          return {};
        }
      })
      .catch((error:any) => {
        mobileLoadingService.loading = false;
        console.log('=========> error: ', error.response);
        errorResponse && errorResponse(error.response);
        if (error && error.response && error.response.status == 401) {
          // cancelRequestApi();
        } else {
          // return error.response
        }
        // return null
      });
  }

  /**
   *
   * @param url
   * @param params
   * @param headers
   */
  private requestPost(
    url: string,
    params?: any,
    headers?: any | null,
    bodyType?: BodyType,
    isShowLoading?: boolean,
    baseUrl?: string,
    errorResponse?: (error: any) => void,
    isCancelPreRequest?: any,
    dontHideLoading?: boolean,
  ) {
    // Lấy ra state hiện tại của navigation, sẽ bao gồm index của các màn hình trong stack, tên màn hình, ...
    var currentState: NavigationState =
      NavigationService.getNavigator().getRootState();

    let urlRequest = baseUrl ? baseUrl + url : BASE_URL + url;
    // console.log("=======> URL: " + urlRequest)
    // console.log("=======> PARAMS: " + JSON.stringify(params))
    console.log(
      '=======> REQUEST: ' +
        urlRequest +
        ' || ' +
        JSON.stringify(params) +
        ' || ' +
        moment().unix(),
    );
    mobileLoadingService.loading = isShowLoading ?? false;
    var paramsConverted: any = null;
    if (params != null && bodyType != null) {
      if (bodyType == BodyType.URLENCODED) {
        paramsConverted = new URLSearchParams(params).toString();
      } else if (bodyType == BodyType.FORMDATA) {
        const formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));
        paramsConverted = formData;
      } else if (bodyType == BodyType.NONE) {
        paramsConverted = params;
      }
    }
    // Thực hiện cancel request với API có set isCancelPreRequest = true trước đó.
    if (
      isCancelPreRequest &&
      this.mapRequestCancel &&
      this.mapRequestCancel.size > 0
    ) {
      if (this.mapRequestCancel.has(url)) {
        let cancel = this.mapRequestCancel.get(url);
        cancel();
      }
    }

    // let axiosParams = new URLSearchParams(params).toString();
    return Axios.post(
      baseUrl ? baseUrl + url : BASE_URL + url,
      paramsConverted ? paramsConverted : params != null ? params : {},
      {
        headers: headers ? headers : {},
        cancelToken: new CancelToken((cancel:any) => {
          // An executor function receives a cancel function as a parameter
          if (isCancelPreRequest) {
            this.mapRequestCancel.set(url, cancel);
          }
          // Không save các cancel request của các màn hình đầu tiên (index = 0) vào trong mảng cancel, vì ở màn hình đầu tiên không
          // có sự kiện back ra màn hình khác, back ở màn này là thoát ứng dụng
          if (currentState.index != 0) {
            this.cancelRequestController[currentState.index].push(cancel);
          }
          // console.log(this.cancelRequestController, "=======> this.requestController[currentState.index][url]: ")
        }),
      },
    )
      .then((res:any) => {
        if (!dontHideLoading) {
          mobileLoadingService.loading = false;
        }
        if (res.data) {
          console.log(
            '=======> RESPONSE || ' +
              url +
              ' : \n' +
              JSON.stringify(res.data) +
              ' || ' +
              moment().unix(),
          );

          ///////////////////////////////////////////// Using to check invalid session
          var resJSON: any = null;
          if (res.data.data) {
            resJSON = JSON.stringify(res.data.data);
          }
          if (
            resJSON != null &&
            resJSON.error &&
            resJSON.error == 'invalid_token'
          ) {
            PopupEvent.open(
              {
                type: 'ERROR',
                title: strings.notify,
                message: strings.session_invalid,
                titlePrimary: strings.ok,
                disableClose: true,
              },
              () => {
                PopupEvent.onPressPrimaryEvent(async () => {
                  PopupEvent.close();
                  NavigationService.navigate('LoginScreen', {});
                });
              },
            );
          }
          ///////////////////////////////////////////// End check invalid session
          return res.data;
        } else {
          return {};
        }
      })
      .catch((error:any) => {
        console.log('error', error.response);
        errorResponse && errorResponse(error.response);
        if (!dontHideLoading) {
          mobileLoadingService.loading = false;
        }
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.log(
            'status/data: ' + error.response.status + '/' + error.response.data,
          );
          if (error.response.status == 401) {
            // cancelRequestApi();
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
          console.log('Error1: ' + error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error2:', error.message);
        }
        console.log('Error3: ' + error);
        return error.response;
      });
  }

  /**
   *
   * @param url
   * @param body
   * @param headers
   * @param progressCallback
   */
  private requestUploadFiles(
    url: string,
    body: any,
    headers?: any | null,
    progressCallback?: (number: any) => void,
    fixURL?: string,
    isShowLoading?: boolean,
  ) {
    let urlRequest = fixURL ? fixURL + url : BASE_URL + url;
    console.log('=======> URL: ' + urlRequest);
    console.log('=======> PARAMS: ', body);
    mobileLoadingService.loading = isShowLoading ?? false;
    return RNFetchBlob.config({
      trusty: true,
      timeout: 1000 * 60 * 5,
    })
      .fetch('POST', urlRequest, headers ? headers : {}, body)
      .uploadProgress((written, total) => {
        var percent = Math.floor((written / total) * 100);
        if (progressCallback) {
          progressCallback(percent);
        }
      })
      .then(resp => {
        mobileLoadingService.loading = false;
        if (resp) {
          console.log('=======> RESPONSE: ', resp);
          console.log('=======> RESPONSE: ', resp.data);
          return JSON.parse(resp.data);
        } else {
          return null;
        }
      })
      .catch(err => {
        mobileLoadingService.loading = false;
        console.log(err, 'err');

        console.log('========> err: ' + JSON.stringify(err));
      });
  }

  /**
   *
   * @param fileUrl
   * @param fileName
   */
  public async requestDownloadFile(
    fileUrl: string,
    fileName: string,
    progressCallback?: (percent?: number, res?: any) => void,
    enableAndroidDownloadManager?: boolean,
  ) {
    let dirs = RNFetchBlob.fs.dirs;
    let path = '';
    if (
      enableAndroidDownloadManager != undefined &&
      enableAndroidDownloadManager == true
    ) {
      path = dirs.DCIMDir + '/apk/' + fileName + '.apk';
    } else {
      path = dirs.DocumentDir + '/' + fileName;
    }

    if (!(await RNFetchBlob.fs.exists(path))) {
      RNFetchBlob.config(
        enableAndroidDownloadManager != undefined &&
          enableAndroidDownloadManager == true
          ? {
              trusty: true,
              fileCache: true,
              path: path,
              addAndroidDownloads: {
                useDownloadManager: true, // <-- this is the only thing required
                // Optional, override notification setting (default to true)
                notification: true,
                // Optional, but recommended since android DownloadManager will fail when
                // the url does not contains a file extension, by default the mime type will be text/plain
                // mime : 'text/plain',
                description: 'Downloading...',
                path: path,
                title: fileName,
                mime: 'application/vnd.android.package-archive',
                mediaScannable: true,
              },
            }
          : {
              trusty: true,
              fileCache: true,
              path: path,
            },
      )
        .fetch('GET', fileUrl, {
          'Transfer-Encoding': 'chunked',
        }) // header?, body?
        .progress(() => {
          // var percent = Math.floor((received / total) * 100)
          // if (progressCallback) {
          //   progressCallback(percent)
          // }
        })
        .then(res => {
          if (progressCallback) {
            progressCallback(100, res.data);
          }
        })
        .catch(err => {
          console.log('download image error', err);
        });
    } else {
      if (progressCallback) {
        progressCallback(100, path);
      }
    }
  }

  /**
   *
   * @param fileUrl
   * @param fileName
   */
  public async requestDownloadFiles(
    fileUrl: string,
    fileName: string,
    progressCallback?: (percent?: number, res?: any) => void,
    enableAndroidDownloadManager?: boolean,
  ) {
    let dirs =
      Platform.OS == 'ios'
        ? RNFetchBlob.fs.dirs.DocumentDir
        : RNFetchBlob.fs.dirs.DownloadDir;
    let _path = '';
    if (fileName.includes('.jpg')) {
      _path = dirs + `/${fileName}`;
    } else {
      _path = dirs + `/${fileName}.jpg`;
    }
    if (!(await RNFetchBlob.fs.exists(_path))) {
      RNFetchBlob.config({
        trusty: true,
        fileCache: true,
        path: _path,
      })
        .fetch('GET', fileUrl, this.getHeaderUploadFile())
        .progress(() => {
          // var percent = Math.floor((received / total) * 100)
          // if (progressCallback) {
          //   progressCallback(percent)
          // }
        })
        .then(res => {
          // the path should be dirs.DocumentDir + 'path-to-file.anything'
          if (progressCallback) {
            progressCallback(100, res.data);
          }
        });
    } else {
      if (progressCallback) {
        progressCallback(100, _path);
      }
    }
  }

  // Dcore

  getHeadeLogin() {
    let headers: any = {};
    headers[HeaderKeys.LANGUAGE] = strings.getLanguage();
    headers[HeaderKeys.X_KEY] = x_key;
    return headers;
  }
  getHeaderApi() {
    let headers: any = {};
    headers[HeaderKeys.LANGUAGE] = strings.getLanguage();
    headers[HeaderKeys.AUTHEN] =
      'Bearer ' + DataSingleton.getData(DataSingletonKey.SSO_ACCESS_TOKEN, '');
    headers[HeaderKeys.X_KEY] = x_key;
    headers[HeaderKeys.DEVICE_ID] = DataSingleton.getData(
      DataSingletonKey.DEVICE_ID,
      '',
    );
    return headers;
  }
  getHeaderApiNoDevice() {
    let headers: any = {};
    headers[HeaderKeys.LANGUAGE] = strings.getLanguage();
    headers[HeaderKeys.AUTHEN] =
      'Bearer ' + DataSingleton.getData(DataSingletonKey.SSO_ACCESS_TOKEN, '');
    headers[HeaderKeys.X_KEY] = x_key;
    return headers;
  }

  getHeaderApiAddDevice() {
    let headers: any = {};
    headers[HeaderKeys.AUTHEN] = 'SbzM2tzPsCSlpTEdyaju8l9w2C5vmtd4fNAduiLEqng';
    return headers;
  }

  getHeaderUploadFile() {
    let headers: any = {};
    headers[HeaderKeys.LANGUAGE] = strings.getLanguage();
    headers[HeaderKeys.AUTHEN] =
      'Bearer ' + DataSingleton.getData(DataSingletonKey.SSO_ACCESS_TOKEN, '');
    headers[HeaderKeys.X_KEY] = x_key;
    headers[HeaderKeys.CONTENT_TYPE] = HeaderValue.CONTENT_TYPE4;
    return headers;
  }

  // Lấy danh sách các danh mục
  async getAllListCategories() {
    let url = `https://remdongco.d2t.vn/api/v1/categories/filters?order=asc&order_by=order&per_page=1000`;
    const response = await Axios.get(url);
    return response;
  }
  // Lấy chi tiết bài viết
  async getDetailPosts(namePost: String) {
    let url = `api/v1/posts/${namePost}`;
    let params = {};
    return this.requestGet(url, undefined, params, false);
  }

  // Lấy danh sách các bài viết theo textSearch
  async getPostSearch(textSearch: String) {
    let url = `api/v1/posts/filters`;
    let params = {
      search: textSearch,
    };
    return this.requestGet(url, undefined, params, false);
  }
  // Lấy danh sách các bài viết
  async getListPosts(idCategories: number) {
    let url = `api/v1/posts/filters`;
    let params = {
      categories: idCategories,
      per_page: 1000,
    };
    return this.requestGet(url, undefined, params, false);
  }
  async getAllListPosts() {
    let url = `https://remdongco.d2t.vn/api/v1/posts/filters?per_page=1000`;
    const response = await Axios.get(url);
    return response;
  }

  // post thông báo thiết bị + FCM token

  async postNotifiDevices() {
    const deviceInfo = await getDeviceinfor();
    let token = await DataSingleton.getData(DataSingletonKey.FIREBASE_KEY, '');

    let url = 'api/v1/addDevice';
    let params = {
      name: deviceInfo.brand,
      device_token: deviceInfo.deviceId,
      ip_address: '',
      device_id: token,
    };
    return await this.requestPost(url, params, this.getHeaderApiAddDevice());
  }
  //check dieu kien mode setting
  async getShowStore() {
    let url = `api/v1/setting/show_store`;
    return this.requestGet(url, undefined, undefined, false);
  }
  //get thông báo
  async getNotification() {
    let url = `api/v1/setting/notification`;
    return this.requestGet(url, undefined, undefined, false);
  }
}
export default new Api();
