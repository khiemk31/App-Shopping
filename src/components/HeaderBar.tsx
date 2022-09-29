import React from 'react';
import {
  View,
  Image,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TextViewBase from './TextViewBase';
import images from '../../src/res/images';
import sizes from '../../src/res/sizes';
import InputSearch from './input_search/InputSearch';
import NavigationService from '../container/screens/base/NavigationService';
import {ScreenName} from '../container/screens/base/AppContainer';
import fonts from '../../src/res/fonts';

type Props = {
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
};

const HeaderBar = (props: Props) => {
  return (
    <View style={[styles.container, {...props.style}]}>
      {!props.isIconLeft && (
        <TouchableOpacity
          style={{
            padding: sizes._5sdp,
            // backgroundColor: 'red'
          }}
          onPress={() => {
            props?.goBack ? props?.goBack() : NavigationService.pop();
          }}>
          <Image
            source={props.icon ?? images.ic_arrow_left}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      {props.title ? (
        <TextViewBase
          style={[
            styles.title,
            {marginLeft: props.isIconLeft ? 0 : sizes._12sdp},
          ]}>
          {props.title}{' '}
        </TextViewBase>
      ) : (
        <></>
      )}
      {props.isIconHome ?? (
        <TouchableOpacity
          {...props}
          style={{
            padding: sizes._5sdp,
            // backgroundColor: 'red'
          }}
          onPress={() => {
            NavigationService.reset(ScreenName.LOGIN);
          }}>
          <Image
            source={images.ic_home}
            style={[styles.icon, {marginRight: !props.isIconRight ? 0 : 0}]}
          />
        </TouchableOpacity>
      )}
      {!props.isIconRight &&
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
              // backgroundColor: 'blue'
            }}>
            <Image source={images.ic_search} style={styles.icon} />
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default HeaderBar;
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
    flex: 1,
    fontSize: sizes._16sdp,
    lineHeight: sizes._28sdp,
    color: '#1B153D',
    fontFamily: fonts.HelveticaNeueBold,
    marginRight: sizes._10sdp,
  },
  icon: {
    width: sizes._24sdp,
    height: sizes._24sdp,
    tintColor: '#292D32',
  },
  logo: {
    resizeMode: 'contain',
    width: sizes._160sdp,
    height: sizes._40sdp,
  },
});
