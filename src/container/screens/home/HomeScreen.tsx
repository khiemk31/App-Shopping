import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import BaseComponent from '../base/BaseComponent';
import TextViewBase from '../../../components/TextViewBase';
import HeaderBar from '../../../components/HeaderBar';
import colors from '../../../res/colors';
import images from '../../../res/images';
interface HomeScreenProps {
  navigation: any;
  route?: any;
}

interface HomeScreenStates {
  isLoading?: boolean;
  isVisible?: boolean;
}

export default class HomeScreen extends BaseComponent<
  HomeScreenProps,
  HomeScreenStates
> {
  state: HomeScreenStates = {};
  render() {
    return (
      <View style={styles.container}>
        <HeaderBar
          style={{backgroundColor: colors._color_backgound}}
          icon={images.ic_menu}
          // isIconLeft
          // isIconHome
          title={'Beau & Bella'}
          onPressRight={() => {
            this.setState({
              isVisible: false,
            });
          }}
        />
        <TextViewBase title={'HOME'}></TextViewBase>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
