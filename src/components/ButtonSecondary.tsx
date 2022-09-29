import React, {Component} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import TextBase from './TextViewBase';
import sizes from '../../src/res/sizes';
import colors from '../../src/res/colors';

interface Props extends TouchableOpacityProps {
  title: string;
  titleColor?: string;
  contentStyle?: ViewStyle;
  style?: ViewStyle;
  isDisable?: boolean;
  onPress?: () => void;
  fontWeight?: any;
  newBackgroundButton?: string;
}

type State = {};

class ButtonSecondary extends Component<Props, State> {
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
              backgroundColor: newBackgroundButton
                ? newBackgroundButton
                : colors._color_white,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: sizes._5sdp,
              overflow: 'hidden',
              paddingHorizontal: sizes._16sdp,
              paddingVertical: sizes._13sdp,
              justifyContent: 'center',
              borderColor: this.props.isDisable
                ? colors._color_button_secondary_border_disabled
                : colors._color_button_secondary_border,
              borderWidth: 1,
            },
            this.props.contentStyle,
          ]}>
          <TextBase
            title={this.props.title}
            style={{
              fontWeight: fontWeight ? fontWeight : '400',
              fontSize: sizes._font_size_medium,
              color: this.props.isDisable
                ? colors._color_button_secondary_title_disabled
                : colors._color_button_secondary_title,
            }}></TextBase>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ButtonSecondary;
