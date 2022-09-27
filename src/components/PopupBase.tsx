import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import TextBase from './TextViewBase';
// import { popupListIsShowing } from './PopupList';
import colors from '../res/colors';
import ModalByViewBase from './ModalByViewBase';
import sizes from '../res/sizes';
import fonts from '../res/fonts';
import LinearGradient from 'react-native-linear-gradient';

export interface DataPopup {
  centerIcon?: any;
  title?: string;
  description?: string;
  textButton?: string;
}

interface Props {}

type State = {
  centerIcon?: any;
  title?: string;
  description?: string;
  textButton?: string;
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

class PopupBase extends Component<Props, State> {
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

    let timeout = 0;
    // if (popupListIsShowing) {
    //   DeviceEventEmitter.emit(EMIT_DISMISS_MODAL);
    //   timeout = 1000;
    // }

    setTimeout(() => {
      this.close(() => {
        const {centerIcon, title, description, textButton} = data;
        this.setState(
          {
            centerIcon,
            title,
            description,
            textButton,
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
            textButton: '',
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
    textButton: '',
    description: '',
  };

  _popup?: ModalByViewBase;

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
            padding: sizes._30sdp,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors._color_white,
              borderRadius: sizes._20sdp,
              paddingTop: sizes._30sdp,
            }}>
            <Image
              source={this.state.centerIcon}
              // style={{width: sizes._140sdp, height: sizes._150sdp}}
            />
            <TextBase
              title={this.state.title || ''}
              style={{
                fontFamily: fonts.HelveticaNeueRegular,
                color: colors._color_black,
                fontSize: sizes._14sdp,
                marginTop: sizes._30sdp,
              }}
            />
            <TextBase
              title={this.state.description || ''}
              style={{
                fontFamily: fonts.HelveticaNeueRegular,
                color: colors._color_gray4,
                fontSize: sizes._12sdp,
                textAlign: 'center',
                marginTop: sizes._10sdp,
              }}
            />
            <TouchableOpacity
              style={{
                marginTop: sizes._25sdp,
                marginHorizontal: sizes._36sdp,
                justifyContent: 'center',
                alignItems: 'center',
                height: sizes._40sdp,
                width: sizes._200sdp,
                borderRadius: sizes._24sdp,
                marginBottom: sizes._35sdp,
                backgroundColor: colors._color_button_login,
              }}
              onPress={this.onPressPrimary}>
              <LinearGradient
                colors={['#074175', '#1D7954']}
                // colors={['#1D7954', '#074175']}
                useAngle={true}
                angle={45}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: sizes._30sdp,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextBase
                  style={{
                    fontFamily: fonts.HelveticaNeueBold,
                    fontSize: sizes._16sdp,
                    color: colors._color_white,
                  }}
                  title={this.state.textButton || ''}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ModalByViewBase>
    );
  }
}

export default PopupBase;
