import {CommonActions} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {BackHandler, NativeEventSubscription, YellowBox} from 'react-native';
import {NavigationParams} from 'react-navigation';
import TextViewBase from '../../../components/TextViewBase';

import colors from '../../../res/colors';
import sizes from '../../../res/sizes';
import strings from '../../../res/strings';
import {alertBase, PopupEvent} from './App';

// thời gian lấy lại token của app là 10 phút

YellowBox.ignoreWarnings([
  'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
  'ListView is deprecated and will be removed in a future release. See https://fb.me/nolistview for more information',
  'Did not receive response to shouldStartLoad in time, defaulting to YES',
  'Sending `EMIT_DISPATCH_TOUCH_EVENT` with no listeners registered.',
  'YellowBox.js:67 (ADVICE) View #43 of type RCTView has a shadow set but cannot calculate shadow efficiently. Consider setting a background color to fix this, or apply the shadow to a more specific component.',
  'Each ViewPager child must be a <View>. Was PromotionView',
  '(ADVICE) View #2549 of type RCTView has a shadow set but cannot calculate shadow efficiently. Consider setting a background color to fix this, or apply the shadow to a more specific component.',
]);

export type BaseProps = {
  navigation: StackNavigationProp<NavigationParams>;
};

export type BaseState = {};

export default class BaseComponent<
  P extends BaseProps,
  S extends BaseState,
> extends React.Component<P, S> {
  // _subscribeNetworkListener: NetInfoSubscription | null = null;
  _oldStateConnect: boolean = false;
  _isFirstLoad = true;

  /************************************************************************************************************************
   * Default
   * Implement default methods
   *
   ************************************************************************************************************************/

  componentDidMount() {
    if (this.isBackHandlerEnabled() == true) {
      this._backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        this._hardwareBackPress,
      );
    }
  }

  componentWillUnmount() {
    if (this._backHandler != undefined) {
      this._backHandler.remove();
    }
    // this._backHandler && this._backHandler.remove();
    // if (this._subscribeNetworkListener) {
    //   this._subscribeNetworkListener();
    // }
  }

  /************************************************************************************************************************
   * Navigation
   * Implement navigation methods
   *
   ************************************************************************************************************************/

  _backHandler?: NativeEventSubscription;

  _hardwareBackPress = () => {
    if (this.props.navigation.isFocused()) {
      this.onBackPressCallBack();
      return true;
    } else {
      return false;
    }
  };

  /**
   * Nếu muốn thực hiện lắng nghe nút back vật lý trên điện thoại android ở màn hình nào thì màn hình đó
   * cần thiết đặt 2 điều kiện
   * 1. Override và xét biến isBackHandlerEnabled = true
   * 2. Override lại hàm componentDidMount và để super.componentDidMount()
   */
  isBackHandlerEnabled() {
    return false;
  }

  onBackPressCallBack() {
    // cancelRequestApi();
    this._showPopupConfirm(strings.exit_app, () => {
      BackHandler.exitApp();
    });
  }

  _goHome() {
    this.props.navigation.popToTop();
  }

  /**
   *
   * @param routeName
   * @param params
   */
  _reset(routeName: string, params?: object) {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: routeName, params}],
      }),
    );
  }

  _goBack = () => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack();
    }
  };

  /**
   *
   * @param screenName
   * @param params
   */
  _openScreen(screenName: string, params?: object) {
    params = params ? params : {};
    this.props.navigation.navigate(screenName, params);
  }

  /************************************************************************************************************************
   * Common
   * Implement common methods
   *
   ************************************************************************************************************************/
  async getJwtSSOToken() {}

  /**
   * Using to navigate to screen when user click into firebase push notification
   * This case: only executing for chat function
   */
  openScreenWithNotify = async () => {};

  /************************************************************************************************************************
   * Dialog
   * Implement dialogs
   *
   ************************************************************************************************************************/
  /**
   *
   * @param message
   * @param onPressPrimaryEvent
   * @param buttonText
   */
  _showDialogNormal(
    message: string,
    onPressPrimaryEvent?: () => void,
    buttonText?: string,
  ) {
    PopupEvent.open({
      title: strings.notify,
      message: message,
      titlePrimary: buttonText == undefined ? strings.close : buttonText,
      disableClose: true,
    });
    PopupEvent.onPressPrimaryEvent(async () => {
      PopupEvent.close(() => {
        if (onPressPrimaryEvent) {
          onPressPrimaryEvent();
        }
      });
    });
  }

  /**
   *
   * @param message
   * @param onPressPrimaryEvent
   */
  _showPopupConfirm(message: string, onPressPrimaryEvent?: () => void) {
    PopupEvent.open({
      title: strings.notify,
      message: message,
      titlePrimary: strings.cancelH,
      titleSecondary: strings.ok,
      disableClose: true,
    });
    PopupEvent.onPressPrimaryEvent(async () => {
      PopupEvent.close(() => {
        // if (onPressPrimaryEvent) {
        //   onPressPrimaryEvent();
        // }
      });
    });
    PopupEvent.onPressSecondaryEvent(async () => {
      PopupEvent.close(() => {
        if (onPressPrimaryEvent) {
          onPressPrimaryEvent();
        }
      });
    });
  }

  /**
   *
   * @param message
   * @param onPressPrimaryEvent
   */
  _showDialogError(message: string, onPressPrimaryEvent?: () => void) {
    PopupEvent.open({
      type: 'ERROR',
      title: strings.notify,
      message: message,
      titlePrimary: strings.close,
      disableClose: true,
    });
    PopupEvent.onPressPrimaryEvent(async () => {
      PopupEvent.close(() => {
        if (onPressPrimaryEvent) {
          onPressPrimaryEvent();
        }
      });
    });
  }

  /**
   *
   * @param description
   * @param textOk
   * @param textCancel
   * @param title
   * @param onPressPrimaryEvent
   * @param onPressSecondaryEvent
   */
  showAlert(
    description: string,
    textOk: string,
    textCancel?: string,
    title?: string,
    onPressPrimaryEvent?: () => void,
    onPressSecondaryEvent?: () => void,
  ) {
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
  }

  /************************************************************************************************************************
   * Subview
   * Implement common subview
   *
   ************************************************************************************************************************/

  renderEmptyView() {
    return (
      <TextViewBase
        title={strings.no_data}
        style={{
          textAlign: 'center',
          alignItems: 'center',
          fontSize: sizes._font_size_large_large,
          color: colors._color_gray4,
          marginTop: sizes._15sdp,
        }}
      />
    );
  }
}
