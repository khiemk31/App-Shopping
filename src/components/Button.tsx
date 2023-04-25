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

interface Props extends TouchableOpacityProps {
  title?: string;
  titleColor?: string;
  contentStyle?: ViewStyle;
  style?: ViewStyle;
  onPress?: () => void;
}

type State = {};

class Button extends Component<Props, State> {
  render() {
    return (
      <TouchableOpacity
        {...this.props}
        style={[
          {
            marginVertical: sizes._40sdp,
          },
          this.props.style ? this.props.style : {},
        ]}>
        <View
          style={[
            {
              marginHorizontal: sizes._15sdp,
              backgroundColor: colors._color_app_default,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: sizes._5sdp,
              overflow: 'hidden',
              paddingLeft: sizes._15sdp,
              paddingRight: sizes._7sdp,
              paddingVertical: sizes._12sdp,
              justifyContent: 'center',
            },
            this.props.contentStyle,
          ]}>
          <Text
            style={{
              fontSize: sizes._16sdp,
              color: this.props.titleColor || colors._color_white,
            }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Button;
