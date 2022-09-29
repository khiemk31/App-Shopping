import React, {Component} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  TextStyle,
} from 'react-native';
import TextBase from './TextViewBase';
import sizes from '../../src/res/sizes';
import colors from '../../src/res/colors';
import fonts from '../../src/res/fonts';

interface Props extends TouchableOpacityProps {
  title: string;
  titleColor?: string;
  contentStyle?: ViewStyle;
  style?: ViewStyle;
  isDisable?: boolean;
  onPress?: () => void;
  fontWeight?: any;
  newBackgroundButton?: string;
  borderWidth?: number;
  heightButton?: number;
  fontFamilyText?: string;
  colorText?: string;
  fontSizeText?: number;
  styleTitle?: TextStyle;
}

type State = {};

class ButtonBorderRadiusBase extends Component<Props, State> {
  render() {
    const {fontWeight, newBackgroundButton} = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        disabled={this.props.isDisable ? this.props.isDisable : false}
        style={[{}, this.props.style ? this.props.style : {}]}>
        <View
          style={[
            {
              backgroundColor: this.props.isDisable
                ? colors._color_button_primary_bg_disabled
                : newBackgroundButton
                ? newBackgroundButton
                : colors._color_white,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: sizes._25sdp,
              overflow: 'hidden',
              height: this.props.heightButton
                ? this.props.heightButton
                : sizes._50sdp,
              // paddingHorizontal: sizes._16sdp,
              // paddingVertical: sizes._16sdp,
              justifyContent: 'center',
              borderColor: this.props.isDisable
                ? colors._color_button_secondary_border_disabled
                : colors._color_button_login,
              borderWidth: this.props.borderWidth ? this.props.borderWidth : 0,
            },
            this.props.contentStyle,
          ]}>
          <TextBase
            title={this.props.title}
            style={{
              // fontWeight: fontWeight ? fontWeight : '400',
              fontSize: this.props.fontSizeText
                ? this.props.fontSizeText
                : sizes._font_size_medium,
              color: this.props.colorText
                ? this.props.colorText
                : colors._color_button_login,
              fontFamily: this.props.fontFamilyText
                ? this.props.fontFamilyText
                : fonts.HelveticaNeueBold,
              ...this.props.styleTitle,
            }}></TextBase>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ButtonBorderRadiusBase;
