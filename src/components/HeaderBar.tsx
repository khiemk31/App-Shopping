import React from 'react';
import {
  Image,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../src/res/images';
import sizes from '../../src/res/sizes';
import NavigationService from '../container/screens/base/NavigationService';
import fonts from '../../src/res/fonts';
import BaseComponent, {
  BaseProps,
} from '../container/screens/base/BaseComponent';
import TextViewBase from './TextViewBase';
import colors from '../res/colors';

interface State {}

interface Props extends BaseProps {
  title?: String;
  icon?: any;
  height?: number;
  width?: number;
  onPress?: () => void;
  style?: ViewStyle;
  goBack?: () => void;
  onPressRight?: () => void;
  isIconRight: boolean;
  isIconLeft: boolean;
}

export default class HeaderBar extends BaseComponent<Props, State> {
  state: State = {};

  render() {
    return (
      <View style={[styles.container, {...this.props.style}]}>
        {this.props.isIconLeft ? (
          <TouchableOpacity
            style={{
              padding: sizes._5sdp,
            }}
            onPress={() => {
              console.log('CLick');
              // this.props?.goBack
              //   ? this.props?.goBack()
              //   : NavigationService.pop();
            }}>
            <Image
              source={this.props.icon ?? images.ic_notification}
              style={styles.icon}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {this.props.title ? (
          <TextViewBase style={styles.title}>
            {this.props.title}
            {''}
          </TextViewBase>
        ) : (
          <></>
        )}

        {this.props.isIconRight ? (
          <TouchableOpacity
            onPress={this.props.onPressRight}
            style={{
              padding: sizes._5sdp,
            }}>
            <Image source={images.ic_notification} style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors._color_white,
    paddingTop: sizes._statusbar_height,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: sizes._3sdp,
    height: sizes._header_height,
  },
  title: {
    textAlign: 'center',
    flex: 1,
    fontSize: sizes._26sdp,
    lineHeight: sizes._28sdp,
    color: '#040302',
    fontFamily: fonts.ElMessiriRegular,
    marginRight: sizes._10sdp,
  },
  icon: {
    width: sizes._32sdp,
    height: sizes._32sdp,
  },
});
