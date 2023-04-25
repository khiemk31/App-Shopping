import React, {Component} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from 'react-native';
import sizes from '../../src/res/sizes';
import colors from '../../src/res/colors';
import TextBase from './TextViewBase';

interface Props extends TouchableOpacityProps {
  title?: string;
  titleColor?: string;
  contentStyle?: ViewStyle;
  style?: ViewStyle;
  isDisable?: boolean;
  onPress?: () => void;
  fontWeight?: any;
  newBackgroundButton?: string;
}

type State = {};

class ButtonPrimary extends Component<Props, State> {
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
              backgroundColor:
                this.props.isDisable == false
                  ? newBackgroundButton
                    ? newBackgroundButton
                    : colors._color_button_primary_bg
                  : colors._color_button_primary_bg_disabled,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: sizes._5sdp,
              overflow: 'hidden',
              paddingHorizontal: sizes._16sdp,
              paddingVertical: sizes._13sdp,
              justifyContent: 'center',
              borderColor: newBackgroundButton
                ? newBackgroundButton
                : colors._color_button_primary_bg_disabled,
              borderWidth: 1,
            },
            this.props.contentStyle,
          ]}>
          <TextBase
            title={this.props.title}
            style={{
              fontWeight: fontWeight ? fontWeight : '400',
              fontSize: sizes._font_size_medium,
              color: this.props.titleColor || colors._color_white,
            }}></TextBase>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ButtonPrimary;
