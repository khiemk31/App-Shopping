import React, {PureComponent} from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  Image,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import sizes from '../../res/sizes';
import colors from '../../res/colors';
import images from '../../res/images';
import TextBase from '../TextViewBase';
import {EventDispatcher, Handler} from '../../utils/Utils';

export enum NotificationType {
  MESSAGE,
}

interface Props {}

interface State {
  isShow: boolean;
  title: String;
  content: String;
  icon: any | null;
  yPosition: Animated.Value;
  eventObject: NotificationEvent<any> | null;
}

export interface NotificationEvent<T extends NotificationOBJ> {
  type: NotificationType;
  object: T;
}

export interface NotificationOBJ {
  title: String;
  content: String;
  icon?: any | null;
}

export interface PushMessageOBJ extends NotificationOBJ {
  groupId: number;
}

class LocalNotification extends PureComponent<Props, State> {
  public onNotificationDispatcher = new EventDispatcher<
    NotificationEvent<any>
  >();

  public onNotificationEvent(handler: Handler<NotificationEvent<any>>) {
    this.onNotificationDispatcher.register(handler);
  }

  private setNotificationEvent(event: NotificationEvent<any> | null) {
    this.onNotificationDispatcher.fire(event);
  }

  hideTimeout: any;

  state: State = {
    isShow: false,
    title: '',
    content: '',
    yPosition: new Animated.Value(-sizes._100sdp),
    eventObject: null,
    icon: null,
  };

  /**
   *
   * @param title
   * @param content
   */
  show(event: NotificationEvent<any>, duration?: number) {
    if (this.hideTimeout != undefined) {
      clearTimeout(this.hideTimeout);
    }
    this.setState({
      isShow: true,
      title: event.object.title,
      content: event.object.content,
      icon: event.object.icon,
      eventObject: event,
    });

    Animated.timing(this.state.yPosition, {
      toValue: 0,
      easing: Easing.back(0),
      duration: duration ? duration : 300,
      useNativeDriver: true,
    }).start();

    // Set timeout to hide notification
    this.hideTimeout = setTimeout(() => {
      this.hide();
    }, 2500);
  }

  /**
   * Using to hide notification
   * @param duration
   */
  hide(duration?: number) {
    Animated.timing(this.state.yPosition, {
      toValue: -sizes._100sdp,
      easing: Easing.back(0),
      duration: duration ? duration : 500,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        isShow: false,
      });
    });
  }

  render() {
    return (
      this.state.isShow && (
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState(
              {
                isShow: false,
              },
              () => {
                this.hide();
              },
            );

            this.setNotificationEvent(this.state.eventObject);
          }}>
          <Animated.View
            style={{...styles.container, top: this.state.yPosition}}>
            <Image
              source={this.state.icon ? this.state.icon : images.app_icon}
              style={styles.icon}
            />
            <View style={styles.parentContent}>
              <TextBase title={this.state.title} style={styles.title} />

              <TextBase title={this.state.content} style={styles.content} />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: sizes._60sdp,
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors._color_gray2,
    paddingVertical: sizes._5sdp,
    flexDirection: 'row',
    borderRadius: sizes._25sdp,
    marginTop: sizes._25sdp,
  },
  parentContent: {
    flexDirection: 'column',
    marginLeft: sizes._10sdp,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: sizes._font_size_large_large,
    textAlignVertical: 'center',
    height: sizes._20sdp,
  },
  content: {
    marginTop: sizes._5sdp,
    fontSize: sizes._font_size_medium_medium_medium,
    textAlignVertical: 'center',
    height: sizes._20sdp,
  },
  icon: {
    width: sizes._40sdp,
    height: sizes._40sdp,
    marginLeft: sizes._15sdp,
  },
});

export default LocalNotification;
