import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import moment from 'moment';
import React, {Component} from 'react';
import {
  AppRegistry,
  StatusBar,
  Text,
  DeviceEventEmitter,
  LogBox,
  AppState,
} from 'react-native';
import {
  EMIT_APP_PAUSE,
  EMIT_APP_RESUME,
  Language,
  SettingKey,
} from '../../../common/Constant';
import DataSingleton, {DataSingletonKey} from '../../../common/DataSingleton';
import {NotificationApp} from '../../../common/Type';
import AlertBase from '../../../components/AlertBase';
import ConnectStatusComponent from '../../../components/ConnectStatusComponent';
import {Loading, mobileLoadingService} from '../../../components/Loading';
import NoInternet from '../../../components/no_internet/NoInternet';
import PopupAlertBase from '../../../components/PopupAlertBase';
import PopupBase from '../../../components/PopupBase';
import sizes from '../../../res/sizes';
import strings from '../../../res/strings';
import AppContainer from './AppContainer';
import NavigationService from './NavigationService';
import LocalNotification, {
  NotificationType,
} from '../../../components/notification/LocalNotification';
0;

import UtilsStorage from '../../../utils/UtilsStorage';
import {getDeviceinfor} from '../../../utils/UtilsDevice';
import AdSdk from '../../../sdk/AdSdk';
// thời gian lấy lại token của app là 55 phút
const TIME_INTERVAL_REQUEST = 55 * 60 * 1000;
// thời gian giới hạn lấy lại token là 60 phút.
const TIMEOUT_TOKEN = 60 * 60 * 1000;
// Thời gian lấy lại token cho thông tin lương, thông tin vào ra là 5 phút.
const TTNS_TIMEOUT_TOKEN = 5 * 60;
// Thời gian khi pause app vào lại không cần login 5 phút
const TIME_APP_PAUSE = 5 * 60;

// console.disableYellowBox = true;
LogBox.ignoreAllLogs(true);

/**********************************************************************************************************************
 * Using to assign console.log to nothing on production mode
 **********************************************************************************************************************/
if (!__DEV__) {
  console.log = () => {};
}

export var isAppPaused: boolean = false;

/**
 *
 * @param description
 * @param textOk
 * @param textCancel
 * @param title
 * @param onPressPrimaryEvent
 * @param onPressSecondaryEvent
 */
export const showBaseAlert = (
  description: string,
  textOk: string,
  textCancel?: string,
  title?: string,
  onPressPrimaryEvent?: () => void,
  onPressSecondaryEvent?: () => void,
) => {
  if (alertBase == null) {
    return;
  }
  alertBase.open({
    title: title,
    description: description,
    textOk: textOk,
    textCancel: textCancel,
  });
  alertBase.onPressPrimaryEvent(async () => {
    alertBase.close(() => {
      if (onPressPrimaryEvent) {
        onPressPrimaryEvent();
      }
    });
  });
  alertBase.onPressSecondaryEvent(async () => {
    alertBase.close(() => {
      if (onPressSecondaryEvent) {
        onPressSecondaryEvent();
      }
    });
  });
};

interface Props {}

export var PopupEvent: PopupAlertBase;
export var PopupCommon: PopupBase;
export var alertBase: AlertBase;
export var messageConnect: ConnectStatusComponent;
export var localNotification: LocalNotification | null;
export var isOnline: boolean = true;

// export let isAppPaused: boolean = false;

class App extends Component<Props> {
  currentState: NavigationState | null = null;
  unsubscribe: any = null;
  _taskInterval: any = null;
  _isFirstLoad = true;

  state = {
    codePushVersion: '',
    timeOut: '',
    checkNetwork: true,
    titleInternet: '',
    // appState: AppState.currentState
  };

  _subscriptionDispatchTouchEvent: any;
  _subscriptionAppResume: any;
  _subscriptionAppPause: any;
  // isAppPaused: boolean = false

  /********************************************************************************************************************
   * Override
   * Implement override method of class
   *
   ********************************************************************************************************************/
  async componentWillMount() {
    // strings.setLanguage("vi");
    // Geolocation.requestAuthorization();
    const deviceinfo = await getDeviceinfor();
    //@ts-ignore
    DataSingleton.setData(DataSingletonKey.DEVICE_ID, deviceinfo.uniqueId);
    this.getCache();
    this.requestUserPermission();
    this.onSetLanguage();
    this._subscriptionAppResume = DeviceEventEmitter.addListener(
      EMIT_APP_RESUME,
      this._onAppResume,
    );
    this._subscriptionAppPause = DeviceEventEmitter.addListener(
      EMIT_APP_PAUSE,
      this._onAppPause,
    );
    AppState.addEventListener('change', e => {
      if (e === 'active') {
        DeviceEventEmitter.emit(EMIT_APP_RESUME);
      } else {
        DeviceEventEmitter.emit(EMIT_APP_PAUSE);
      }
    });
  }
  getJwtSSOToken() {}
  getCache = async () => {};
  componentDidMount = async () => {
    // strings.setLanguage("vi");
    try {
      let token = await messaging().getToken();
      DataSingleton.setData(DataSingletonKey.FIREBASE_KEY, token);
      console.log('FIREBASE_KEY, day la token FCM', token);
    } catch (error) {
      DataSingleton.setData(DataSingletonKey.FIREBASE_KEY, null);
      console.log('err_FIREBASE_KEY', error);
    }

    this._taskInterval = setInterval(
      this._handleTimeInterval,
      TIME_INTERVAL_REQUEST,
    );

    this.setupConnectivityListener();

    // Setup auto init firebase analytics
    await analytics().setAnalyticsCollectionEnabled(true);

    this.setupFirebaseMessageListener();

    // Setup local notification listener, using to handle the callback when user click into notification
    if (localNotification) {
      localNotification.onNotificationEvent((event: any) => {
        switch (event.type) {
          case NotificationType.MESSAGE:
            break;
        }
      });
    }
    AdSdk.getInstance();
  };

  componentWillUnmount() {
    clearInterval(this._taskInterval);

    // this._onDispatchTouchEvent && DeviceEventEmitter.removeListener(EMIT_DISPATCH_TOUCH_EVENT, this._onDispatchTouchEvent);
    this.unsubscribe && this.unsubscribe();
    // Delete all data temporary
    DataSingleton.clearAll();
  }

  _onAppPause = () => {
    console.log('_onAppPause');
    isAppPaused = true;
    DataSingleton.setData(DataSingletonKey.IS_APP_PAUSE, true);
    DataSingleton.setData('onAppPauseTime', moment().unix());
    DataSingleton.setData('onAppPauseTimeEducate', moment().unix());
    // isAppPaused = true
    /// Khi ứng dụng pause thực hiện disconnect socket với mục đích để nhận được push notification từ firebase
    // SocketManager.disconnect()
    clearInterval(this._taskInterval);
  };

  _onAppResume = async () => {
    isAppPaused = false;
    this._taskInterval = setInterval(
      this._handleTimeInterval,
      TIME_INTERVAL_REQUEST,
    );

    // ****************** Khả năng ko dùng đến config này ******************

    AppRegistry.registerHeadlessTask(
      'RNFirebaseBackgroundMessage',
      () => backgroundNotificationHandler,
    );
    const backgroundNotificationHandler = async () => {
      console.log('Received Background Notification', ':satellite:');
      return Promise.resolve();
    };
  };

  onSetLanguage = async () => {
    const language = await UtilsStorage.get(SettingKey.APP_LANGUAGE);
    if (!!language) {
      if (language === Language.VIETNAMESE) {
        this.setState({language: Language.VIETNAMESE});
        strings.setLanguage(Language.VIETNAMESE);
      } else {
        this.setState({language: Language.ENGLISH});
        strings.setLanguage(Language.ENGLISH);
      }
    } else {
      const lan = strings.getLanguage();
      if (lan === Language.VIETNAMESE) {
        this.setState({language: Language.VIETNAMESE});
        strings.setLanguage(Language.VIETNAMESE);
        await UtilsStorage.set(SettingKey.APP_LANGUAGE, Language.VIETNAMESE);
      } else {
        this.setState({language: Language.ENGLISH});
        strings.setLanguage(Language.ENGLISH);
        await UtilsStorage.set(SettingKey.APP_LANGUAGE, Language.ENGLISH);
      }
    }
    let lang = await UtilsStorage.get(SettingKey.APP_LANGUAGE);
  };

  /**
   * Using to refresh JWT token after each 10 minutes
   */
  _handleTimeInterval = async () => {};

  /**
   * Using to setup connectivity listener
   */
  setupConnectivityListener = () => {
    this.unsubscribe = NetInfo.addEventListener((state: any) => {
      if (
        this.state.checkNetwork !== state.isConnected &&
        state.isConnected &&
        state.isInternetReachable
      ) {
        if (isOnline) {
          return;
        }
        isOnline = true;
        this.setState({titleInternet: strings.doConnect}, () => {
          setTimeout(() => {
            this.setState({titleInternet: strings.haveInternet});
          }, 500);
        });
        setTimeout(() => {
          this.setState({checkNetwork: state.isConnected});
        }, 1500);
      } else if (
        this.state.checkNetwork !== state.isConnected &&
        !state.isConnected
      ) {
        isOnline = false;
        this.setState({
          titleInternet: strings.nonInternet,
          checkNetwork: state.isConnected,
        });
      }
    });
  };

  /******************************************************************************************************************************
   * Firebase
   * Sử dụng để yêu cầu người dùng cấp quyền push notification cho ứng dụng
   *
   ******************************************************************************************************************************/
  setupFirebaseMessageListener() {
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          let notificationApp: NotificationApp = remoteMessage;
          DataSingleton.setData(
            DataSingletonKey.DATA_NOTIFY_FIREBASE,
            notificationApp,
          );
          DataSingleton.setData(DataSingletonKey.IS_CLICK_NOTIFY, true);
          console.log('getInitialNotification', JSON.stringify(remoteMessage));
        }
      });

    // Listen when a new message arrives in the foreground mode -----------------------> đã OK
    messaging().onMessage(async (remoteMessage: any) => {
      console.log(
        'firebase/messaging A new FCM message arrived!',
        remoteMessage,
      );
    });

    // Listen when a new message arrives in the background & quit mode
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      let timePause = DataSingleton.getData('onAppPauseTime', moment().unix());

      // Alert.al6ert('A new FCM message background!', JSON.stringify(remoteMessage));
      console.log(
        'firebase/messaging Message handled in the background!',
        remoteMessage,
      );
      if (remoteMessage) {
        let notificationApp: NotificationApp = remoteMessage;
        DataSingleton.setData(
          DataSingletonKey.DATA_NOTIFY_FIREBASE,
          notificationApp,
        );
        DataSingleton.setData(DataSingletonKey.IS_CLICK_NOTIFY, true);
      }
    });

    // When the application is running, but in the background.
    // Ẩn app
    messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
      // console.log('=========> ON PUSH FIREBASE CLICKED: ', remoteMessage);
      console.log(
        'firebase/messaging Notification caused app to open from background state:',
        remoteMessage,
      );
      if (remoteMessage) {
        let notificationApp: NotificationApp = remoteMessage;
        DataSingleton.setData(
          DataSingletonKey.DATA_NOTIFY_FIREBASE,
          notificationApp,
        );
        DataSingleton.setData(DataSingletonKey.IS_CLICK_NOTIFY, true);
        console.log(
          'When the application is running, but in the background.',
          JSON.stringify(remoteMessage),
        );
      }
    });
  }

  cancelAllNotify = async () => {
    PushNotification.cancelAllLocalNotifications();
  };

  async requestUserPermission() {
    // Permissions reference : https://rnfirebase.io/messaging/ios-permissions
    const authStatus = await messaging().requestPermission({
      alert: true, //Sets whether notifications can be displayed to the user on the device
      badge: true, //Sets whether a notification dot will appear next to the app icon on the device when there are unread notifications
      sound: true, //Sets whether a sound will be played when a notification is displayed on the device
    });
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('firebase/messaging Authorization status:', authStatus);
    } else {
      console.log(
        'firebase/messaging Authorization status:',
        'Push notification is not allowed!',
      );
      // showBaseAlert("NOT ALLOWED", "OK")
    }
  }

  /*******************************************************************************************************************************
   * Render
   * Implement render mothod
   *
   *******************************************************************************************************************************/
}

export default App;
