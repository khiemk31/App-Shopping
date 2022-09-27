import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import TextBase from './TextViewBase';
// import {popupListIsShowing} from './PopupList';
import colors from '../res/colors';
import ModalByViewBase from './ModalByViewBase';
import sizes from '../res/sizes';
import fonts from '../res/fonts';

export interface DataPopup {
  title?: string;
  description?: string;
  textOk?: string;
  textCancel?: string;
}

interface Props {}

type State = {
  title?: string;
  description?: string;
  textOk?: string;
  textCancel?: string;
};

type Handler<E> = (event: E) => void;

interface OnCloseEvent {}
interface OnPressPrimaryEvent {}
interface OnPressSecondaryEvent {}

class EventDispatcher<E> {
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
}

class AlertBase extends Component<Props, State> {
  // event primary
  private onPressPrimaryDispatcher = new EventDispatcher<OnPressPrimaryEvent>();
  public onPressPrimaryEvent(handler: Handler<OnPressPrimaryEvent>) {
    this.onPressPrimaryDispatcher.register(handler);
  }
  private setPressPrimaryEvent(event: OnPressPrimaryEvent) {
    this.onPressPrimaryDispatcher.fire(event);
  }

  // event secondary
  private onPressSecondaryDispatcher =
    new EventDispatcher<OnPressSecondaryEvent>();
  public onPressSecondaryEvent(handler: Handler<OnPressSecondaryEvent>) {
    this.onPressSecondaryDispatcher.register(handler);
  }
  private setPressSecondaryEvent(event: OnPressSecondaryEvent) {
    this.onPressSecondaryDispatcher.fire(event);
  }

  // event close
  private onCloseDispatcher = new EventDispatcher<OnCloseEvent>();
  public onCloseEvent(handler: Handler<OnCloseEvent>) {
    this.onCloseDispatcher.register(handler);
  }
  private setCloseEvent(event: OnCloseEvent) {
    this.onCloseDispatcher.fire(event);
  }

  public open(data: DataPopup, callback?: () => void): void {
    this.onCloseDispatcher.clear();
    this.onPressPrimaryDispatcher.clear();
    this.onPressSecondaryDispatcher.clear();

    let timeout = 0;
    // if (popupListIsShowing) {
    //   DeviceEventEmitter.emit(EMIT_DISMISS_MODAL);
    //   timeout = 1000;
    // }

    setTimeout(() => {
      this.close(() => {
        const {title, description, textOk, textCancel} = data;
        this.setState(
          {
            title,
            description,
            textOk,
            textCancel,
          },
          () => {
            this._popup &&
              this._popup._show(() => {
                this.isVisible = true;
                if (callback) callback();
              });
          },
        );
      });
    }, timeout);
  }

  isVisible: boolean = false;

  // public setMessage(message: string): void {
  //   this.setState({
  //     message,
  //   });
  // }

  public close(callback?: () => void): void {
    this.setCloseEvent({});
    this._popup &&
      this._popup._dismiss(() => {
        this.isVisible = false;
        this.setState(
          {
            title: '',
            textOk: '',
            textCancel: '',
            description: '',
          },
          () => {
            if (callback) {
              callback();
            }
          },
        );
      });
  }

  state: State = {
    title: '',
    textOk: '',
    textCancel: '',
    description: '',
  };

  _popup?: ModalByViewBase;

  private onPressSecondary = () => {
    this.setPressSecondaryEvent({});
  };

  private onPressPrimary = () => {
    this.setPressPrimaryEvent({});
  };

  render() {
    return (
      //@ts-ignore
      <ModalByViewBase
        //@ts-ignore
        animationInTiming={10}
        animationOutTiming={10}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        ref={(ref: any) => {
          if (ref) {
            this._popup = ref;
          }
        }}>
        <View
          style={{
            width: sizes._screen_width,
            height: sizes._screen_height,
            justifyContent: 'center',
            alignContent: 'center',
            padding: sizes._50sdp,
          }}>
          <View
            style={{
              backgroundColor: colors._color_white,
              borderRadius: sizes._10sdp,
              paddingHorizontal: sizes._20sdp,
              paddingVertical: sizes._15sdp,
            }}>
            <TextBase
              title={this.state.title || ''}
              style={{
                fontFamily: fonts.HelveticaNeueBold,
                color: colors._color_black,
                fontSize: sizes._14sdp,
                textAlign: 'center',
                // marginTop: sizes._30sdp,
              }}
            />
            <TextBase
              title={this.state.description || ''}
              style={{
                fontFamily: fonts.HelveticaNeueRegular,
                color: colors._color_gray1,
                fontSize: sizes._14sdp,
                marginTop: this.state.title ? sizes._10sdp : 0,
                textAlign: 'justify',
              }}
            />
            <View
              style={{
                flexDirection: 'row-reverse',
                marginTop: sizes._15sdp,
                width: '100%',
              }}>
              <TouchableOpacity onPress={this.onPressPrimary}>
                <TextBase
                  style={{
                    fontFamily: fonts.HelveticaNeueRegular,
                    fontSize: sizes._14sdp,
                    color: colors._color_button_login,
                  }}
                  title={this.state.textOk || ''}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressSecondary}>
                <TextBase
                  style={{
                    marginRight: sizes._30sdp,
                    fontFamily: fonts.HelveticaNeueRegular,
                    fontSize: sizes._14sdp,
                    color: colors._color_button_login,
                  }}
                  title={this.state.textCancel || ''}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalByViewBase>
    );
  }
}

export default AlertBase;
