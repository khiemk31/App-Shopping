import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import TextBase from './TextViewBase';
import ImageBase from './ImageBase';
import images from '../res/images';
// import { popupListIsShowing } from './PopupList';
import colors from '../res/colors';
import ModalByViewBase from './ModalByViewBase';
import sizes from '../res/sizes';
import fonts from '../res/fonts';

type ModalType = 'PRIMARY' | 'ERROR';

export interface DataPopup {
  type?: ModalType;
  isVisible?: boolean;
  title: string;
  message: string;
  titlePrimary?: string;
  titleSecondary?: string;
  disableClose?: boolean;
  viewChildren?: any;
}

interface Props {}

type State = {
  type?: ModalType;
  title: string;
  message: string;
  titlePrimary?: string;
  titleSecondary?: string;
  disableClose?: boolean;
  viewChildren?: any;
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

class PopupAlertBase extends Component<Props, State> {
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
  public onPressSecondaryEvent(handler: Handler<OnPressPrimaryEvent>) {
    this.onPressSecondaryDispatcher.register(handler);
  }
  private setPressSecondaryEvent(event: OnPressPrimaryEvent) {
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

    const {
      type,
      title,
      message,
      titlePrimary,
      titleSecondary,
      disableClose,
      viewChildren,
    } = data;
    this.setState(
      {
        type,
        title,
        message,
        titlePrimary,
        titleSecondary,
        disableClose,
        viewChildren,
      },
      () => {
        this._popup &&
          this._popup._show(() => {
            this.isVisible = true;
            if (callback) callback();
          });
      },
    );

    /**
     * Tạm thời bỏ check PopupList, 2 popup hiện tại nếu cùng gọi show sẽ đề lên nhau
     */

    // let timeout = 0;
    // if (popupListIsShowing) {
    //     DeviceEventEmitter.emit(EMIT_DISMISS_MODAL);
    //     timeout = 1000;
    // }

    // setTimeout(() => {
    //     this.close(() => {
    //         const { type, title, message, titlePrimary, titleSecondary, disableClose, viewChildren } = data;
    //         this.setState({
    //             type, title, message, titlePrimary, titleSecondary, disableClose, viewChildren
    //         }, () => {
    //             this._popup && this._popup._show(() => {
    //                 this.isVisible = true;
    //                 if (callback) callback();
    //             });
    //         })
    //     });
    // }, timeout);
  }

  isVisible: boolean = false;

  public setMessage(message: string): void {
    this.setState({
      message,
    });
  }

  public close(callback?: () => void): void {
    this.setCloseEvent({});
    this._popup &&
      this._popup._dismiss(() => {
        this.setState(
          {
            type: 'PRIMARY',
            title: '',
            message: '',
            titlePrimary: '',
            titleSecondary: '',
          },
          () => {
            this.isVisible = false;
            if (callback) {
              callback();
            }
          },
        );
      });
  }

  state: State = {
    title: '',
    message: '',
  };

  _popup?: ModalByViewBase;

  private onPressSecondary = () => {
    this.setPressSecondaryEvent({});
  };

  private onPressPrimary = () => {
    this.setPressPrimaryEvent({});
  };

  private _renderButton() {
    let btns: Array<any> = [];
    if (this.state.titlePrimary) {
      btns.push(
        <TouchableOpacity
          style={{
            paddingLeft: sizes._30sdp,
          }}
          key={1}
          disabled={false}
          onPress={this.onPressPrimary}>
          <TextBase
            title={this.state.titlePrimary || ''}
            style={{
              fontSize: sizes._font_size_medium,
              fontFamily: fonts.HelveticaNeueRegular,
              color: '#006BA8',
            }}
          />
        </TouchableOpacity>,
      );
    }
    if (this.state.titleSecondary) {
      btns.push(
        <TouchableOpacity
          key={2}
          style={{
            paddingLeft: sizes._30sdp,
          }}
          disabled={false}
          onPress={this.onPressSecondary}>
          <TextBase
            title={this.state.titleSecondary || ''}
            style={{
              fontSize: sizes._font_size_medium,
              fontFamily: fonts.HelveticaNeueRegular,
              color: '#006BA8',
            }}
          />
        </TouchableOpacity>,
      );
    }
    return btns;
  }

  render() {
    let titleColor = colors._color_text_ok;
    titleColor =
      this.state.type === 'ERROR'
        ? colors._color_text_warning
        : colors._color_text_ok;
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
        }}
        isTouchOutsideToDismiss={false}>
        <View
          style={{
            width: sizes._screen_width,
            height: sizes._screen_height,
            justifyContent: 'center',
            alignContent: 'center',
            padding: sizes._30sdp,
          }}>
          <View
            style={{
              backgroundColor: colors._color_white,
              borderRadius: sizes._5sdp,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                padding: sizes._16sdp,
                borderBottomColor: colors._color_backgound,
                borderBottomWidth: sizes._1sdp,
              }}>
              <TextBase
                style={{
                  marginRight: sizes._30sdp,
                  fontSize: sizes._font_size_medium,
                  fontFamily: fonts.HelveticaNeueMedium,
                  fontWeight: 'bold',
                }}
                title={this.state.title || ''}></TextBase>
              {!this.state.disableClose && (
                <TouchableOpacity
                  onPress={() => this.close()}
                  style={{
                    marginLeft: 'auto',
                  }}>
                  <ImageBase
                    style={{
                      tintColor: titleColor,
                      width: sizes._20sdp,
                      height: sizes._20sdp,
                    }}
                    imageSource={images.ic_close}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                padding: sizes._16sdp,
              }}>
              <TextBase
                title={this.state.message || ''}
                style={{
                  fontSize: sizes._font_size_medium,
                  color: '#555555',
                  fontFamily: fonts.HelveticaNeueRegular,
                }}></TextBase>
              {this.state.viewChildren}
            </View>
            <View
              style={{
                padding: sizes._16sdp,
                flexDirection: 'row',
                alignSelf: 'flex-end',
              }}>
              {this._renderButton()}
            </View>
          </View>
        </View>
      </ModalByViewBase>
    );
  }
}

export default PopupAlertBase;
