import React, {Component} from 'react';
import {
  View,
  TextInput,
  ViewStyle,
  TouchableHighlight,
  Image,
  TextInputProps,
} from 'react-native';
import TextBase from './TextViewBase';
import {getMoneyFormat} from '../utils/UtilsMoney';
import fonts from '../res/fonts';
import images from '../res/images';
import colors from '../res/colors';
import sizes from '../res/sizes';
import ImageBase from './ImageBase';

export type InputBaseProps = {
  style?: ViewStyle;
  type: 'NORMAL' | 'MONEY' | 'NUMBER' | 'BUTTON';
  title?: string;
  initValue: string;
  placeholder: string;
  currency?: string;
  onChangeText?: (text: string, isValid?: boolean) => void;
  filterText?: (text: string) => string;
  onBlur?: () => void;
  onFocus?: () => void;
  secureTextEntry?: boolean;
  caption?: string;
  iconRight?: any;
  pressIconRight?: () => void;

  iconRight2?: any;
  pressIconRight2?: () => void;

  isError?: boolean;
  captionError?: string;
  maxLength?: number;
  borderDisable?: boolean;
  disabled?: boolean;
  borderColor?: string;
  iconRightStyle?: any;

  textInputProps?: TextInputProps;
  imageSource?: string;
  autoFocus?: boolean;
};

type InputBaseState = {
  value: string;
  focus: boolean;
  blur: boolean;
  error: boolean;
  disable: boolean;
  originValue: string;
};

export default class InputBase extends Component<
  InputBaseProps,
  InputBaseState
> {
  state: InputBaseState = {
    value: '',
    focus: false,
    blur: true,
    error: false,
    disable: false,
    originValue: '',
  };

  componentDidMount() {
    const isValid = this.validateTextInput(this.props.initValue);
    this.setState(
      {
        value: this.props.initValue,
        originValue: this.props.initValue,
        focus: this.props.initValue.trim().length > 0,
        blur: true,
        error: isValid,
        disable: this.props.disabled ? this.props.disabled : false,
      },
      () => {
        if (this.props.onChangeText) {
          this.props.onChangeText(this.state.value, isValid);
        }
      },
    );
  }

  componentWillReceiveProps(nextProps: InputBaseProps) {
    if (nextProps) {
      this.setState((prevState: InputBaseState) => {
        return {
          error: nextProps.isError || false,
          disable:
            nextProps.disabled && nextProps.disabled != prevState.disable
              ? nextProps.disabled
              : prevState.disable,
        };
      });
    }
  }

  _textInput?: TextInput;
  _textInputAllocCallback?: () => void;

  _getCurrentValue() {
    return this.state.value;
  }

  _getCurrentOriginValue() {
    return this.state.originValue;
  }
  _setText(text: string, callback?: () => void) {
    console.log('_setText', text);
    this.setState(
      {
        value:
          this.props.type == 'MONEY'
            ? getMoneyFormat(
                text,
                this.props.currency == 'VND' ? '100,000.00' : '100.000,00',
              )
            : text,
        originValue: text,
        focus: text.length > 0,
      },
      () => {
        if (callback) {
          callback();
        }
      },
    );
  }

  _setDisable(isDisable: boolean) {
    this.setState({
      disable: isDisable,
      blur: true,
    });
  }

  _focusToTextInput = () => {
    if (this.state.disable) {
      return;
    }

    this._textInputAllocCallback = () => {
      if (this._textInput && !this.state.disable) {
        setTimeout(() => {
          if (this._textInput) {
            try {
              this._textInput.focus();
            } catch (error) {
              console.log(error);
            }
          }
        }, 0);
      }
      this._textInputAllocCallback = undefined;
    };
    this.setState({
      focus: true,
      blur: this.state.disable ? true : false,
    });
  };

  _blurTextInput = () => {
    this.setState(
      prevState => {
        return {
          focus: prevState.value.trim().length > 0,
          value: prevState.value.trim(),
          blur: true,
        };
      },
      () => {
        if (this.props.onBlur) {
          this.props.onBlur();
        }
      },
    );
  };

  _focusInput = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    this.setState({
      blur: false,
    });
  };

  _pressIconRight = () => {
    if (this.props.pressIconRight) {
      this.props.pressIconRight();
    }
  };

  _pressIconRight2() {
    if (this.props.pressIconRight2) {
      this.props.pressIconRight2();
    }
  }

  _onChangeText = (text: string) => {
    if (this.props.type == 'MONEY') {
      text = text.replace(/\D/g, '');
    }

    if (this.props.filterText) {
      text = this.props.filterText(text);
    }
    const isValid = this.validateTextInput(text);

    this.setState(
      {
        value:
          this.props.type == 'MONEY'
            ? getMoneyFormat(
                text,
                this.props.currency == 'VND' ? '100,000.00' : '100.000,00',
              )
            : text,
        originValue: text,
        error: isValid,
      },
      () => {
        if (this.props.onChangeText) {
          this.props.onChangeText(this.state.value, isValid);
        }
      },
    );
  };

  validateTextInput(text: string): boolean {
    if (this.state.error) {
      return true;
    }

    return false;
  }

  render() {
    const {imageSource} = this.props;
    let color_border = this.state.error
      ? colors._color_input_error
      : this.state.blur
      ? colors._color_input_basic
      : colors._color_input_primary;
    let color_text_input = this.state.error
      ? colors._color_input_error
      : colors._color_black;
    let color_text_caption = this.state.error
      ? colors._color_input_error
      : colors._color_input_basic;

    let existCurrency =
      this.props.currency && this.props.currency.length > 0 ? true : false;
    return (
      <View
        style={[
          {
            width: '100%',
          },
          this.props.style,
        ]}>
        <TouchableHighlight
          style={{
            backgroundColor: colors._color_white,
            borderRadius: sizes._5sdp,
            borderWidth: this.props.borderDisable ? 0 : sizes._1sdp,
            borderColor: this.props.borderColor
              ? this.props.borderColor
              : color_border,
          }}
          underlayColor={colors._color_input_basic_bg}
          onPress={this._focusToTextInput}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                height: sizes._64sdp,
                paddingHorizontal: sizes._16sdp,
              }}>
              <TextBase
                style={{
                  fontSize: this.state.focus
                    ? sizes._font_size_medium_medium_medium
                    : sizes._font_size_large,
                  color: this.props.borderColor
                    ? this.props.borderColor
                    : color_border,
                  paddingVertical: this.state.focus ? 0 : sizes._10sdp,
                  marginTop: this.state.focus ? sizes._12sdp : 0,
                  letterSpacing: sizes._1sdp / 2,
                }}
                title={
                  this.state.focus
                    ? this.props.title
                      ? this.props.title
                      : this.props.placeholder
                    : this.props.placeholder
                }
              />
              {this.state.focus && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: sizes._12sdp,
                  }}>
                  <TextInput
                    autoFocus={
                      this.props.autoFocus ? this.props.autoFocus : false
                    }
                    ref={ref => {
                      if (ref) {
                        this._textInput = ref;
                        if (this._textInputAllocCallback) {
                          this._textInputAllocCallback();
                        }
                      }
                    }}
                    keyboardType={
                      this.props.type == 'MONEY' || this.props.type == 'NUMBER'
                        ? 'number-pad'
                        : 'default'
                    }
                    value={this.state.value}
                    style={{
                      padding: 0,
                      margin: 0,
                      borderWidth: 0,
                      fontSize: sizes._16sdp,
                      color: this.props.borderColor
                        ? this.props.borderColor
                        : color_text_input,
                      flex: 1,
                      fontFamily: fonts.HelveticaNeueRegular,
                    }}
                    maxLength={this.props.maxLength}
                    editable={!this.state.disable}
                    onFocus={this._focusInput}
                    onBlur={this._blurTextInput}
                    onChangeText={this._onChangeText}
                    secureTextEntry={
                      this.props.secureTextEntry
                        ? this.props.secureTextEntry
                        : false
                    }
                    {...this.props.textInputProps}
                  />
                  {imageSource ? (
                    <View
                      style={{justifyContent: 'flex-end', width: sizes._50sdp}}>
                      <View
                        style={{
                          alignItems: 'flex-end',
                          flex: 1,
                          justifyContent: 'center',
                        }}>
                        <ImageBase imageSource={imageSource} />
                      </View>
                    </View>
                  ) : existCurrency ? (
                    <View
                      style={{justifyContent: 'flex-end', width: sizes._50sdp}}>
                      <View
                        style={{
                          alignItems: 'center',
                          flex: 1,
                          justifyContent: 'center',
                        }}>
                        <TextBase title={this.props.currency}></TextBase>
                      </View>
                    </View>
                  ) : null}
                </View>
              )}
            </View>
            {this.props.iconRight && (
              <View style={{justifyContent: 'flex-end', width: sizes._50sdp}}>
                <TouchableHighlight
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                  }}
                  underlayColor={colors._color_input_basic_bg}
                  onPress={() => this._pressIconRight()}>
                  {this.props.iconRight && (
                    <Image
                      source={this.props.iconRight}
                      style={[
                        {alignItems: 'center'},
                        this.props.iconRightStyle
                          ? this.props.iconRightStyle
                          : {},
                      ]}
                    />
                  )}
                </TouchableHighlight>
              </View>
            )}
            {this.props.iconRight2 ? (
              <View style={{justifyContent: 'flex-end', width: sizes._50sdp}}>
                <TouchableHighlight
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                  }}
                  underlayColor={colors._color_input_basic_bg}
                  onPress={() => this._pressIconRight2()}>
                  {this.props.iconRight2 && (
                    <Image
                      source={this.props.iconRight2}
                      style={[
                        {alignItems: 'center'},
                        this.props.iconRightStyle
                          ? this.props.iconRightStyle
                          : {},
                      ]}
                    />
                  )}
                </TouchableHighlight>
              </View>
            ) : null}
          </View>
        </TouchableHighlight>
        {this.state.error && this.props.captionError && (
          <TextBase
            title={this.props.captionError}
            style={{
              fontSize: sizes._font_size_medium_medium_medium,
              fontFamily: fonts.HelveticaNeueMedium,
              color: colors._color_input_error,
            }}
          />
        )}
        {this.props.caption && (
          <TextBase
            title={this.props.caption}
            style={{
              fontSize: sizes._font_size_medium_medium_medium,
              fontFamily: fonts.HelveticaNeueMedium,
              color: colors._color_input_basic,
            }}
          />
        )}
      </View>
    );
  }
}
