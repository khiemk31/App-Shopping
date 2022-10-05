import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import BaseComponent from '../base/BaseComponent';

import colors from '../../../res/colors';
import sizes from '../../../res/sizes';
import HeaderBar from '../../../components/HeaderBar';
import images from '../../../res/images';

interface Props {
  navigation: any;
  route?: any;
}

interface States {}

export default class ProfileScreen extends BaseComponent<Props, States> {
  state: States = {};
  render() {
    return (
      <View style={styles.container}>
        <HeaderBar
          navigation={this.props.navigation}
          icon={images.ic_menu}
          isIconLeft={true}
          isIconRight={true}
          title={'Profile'}
          onPressRight={() => {
            this.setState({
              isVisible: false,
            });
          }}
        />
        <Text>Thông tin người dùng</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors._color_white,
    paddingHorizontal: sizes._20sdp,
  },
});
