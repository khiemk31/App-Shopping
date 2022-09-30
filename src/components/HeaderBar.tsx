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
import BaseComponent from '../container/screens/base/BaseComponent';

interface State {}

interface Props {
  title?: String;
  icon?: any;
  height?: number;
  width?: number;
  onPress?: () => void;
  style?: ViewStyle;
  search?: boolean;
  searchContent?: String;
  goBack?: () => void;
  onSearch?: (value: string) => void;
  onPressRight?: () => void;
  isIconRight?: boolean;
  isIconLeft?: boolean;
  isIconHome?: boolean;
}

class HeaderBar extends BaseComponent<State, Props> {
  state: State = {};
  props: Props = {
    isIconLeft = false,
  };
  render() {
    return (
      <View style={[styles.container, {...this.props.style}]}>
        {!props.isIconLeft && (
          <TouchableOpacity
            style={{
              padding: sizes._5sdp,
            }}
            onPress={() => {
              props?.goBack ? props?.goBack() : NavigationService.pop();
            }}>
            <Image
              source={props.icon ?? images.ic_notification}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        {props.title ? (
          <TextViewBase style={styles.title}>
            {props.title}
            {''}
          </TextViewBase>
        ) : (
          <></>
        )}
        {!props.isIconHome ?? (
          <TouchableOpacity
            {...props}
            style={{
              padding: sizes._5sdp,
              backgroundColor: 'red',
            }}
            onPress={() => {
              NavigationService.reset(ScreenName.HOME);
            }}>
            <Image
              source={images.ic_notification}
              style={[styles.icon, {marginRight: !props.isIconRight ? 0 : 0}]}
            />
          </TouchableOpacity>
        )}
        {props.isIconRight &&
          (props.search ? (
            <View>
              <InputSearch
                inputProps={{placeholder: 'Tìm kiếm'}}
                onSearch={props.onSearch}
              />
            </View>
          ) : (
            <TouchableOpacity
              {...props}
              onPress={props.onPressRight}
              style={{
                padding: sizes._5sdp,
                backgroundColor: 'blue',
              }}>
              <Image source={images.ic_search} style={styles.icon} />
            </TouchableOpacity>
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: sizes._statusbar_height,
    paddingHorizontal: sizes._20sdp,
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
