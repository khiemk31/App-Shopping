import {View, StyleSheet, TextInput, Image, FlatList, Text} from 'react-native';
import React from 'react';
import BaseComponent from '../base/BaseComponent';

import colors from '../../../res/colors';
import images from '../../../res/images';
import HeaderBar from '../../../components/HeaderBar';
import sizes from '../../../res/sizes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Category} from '../../../common/Type';
import ItemCategory from './component/ItemCategory';
import LinearGradient from 'react-native-linear-gradient';
interface HomeScreenProps {
  navigation: any;
  route?: any;
}

interface HomeScreenStates {
  listCategory: Category[];
  isLoading?: boolean;
  isVisible?: boolean;
  indexSelect?: number;
}

export default class HomeScreen extends BaseComponent<
  HomeScreenProps,
  HomeScreenStates
> {
  state: HomeScreenStates = {
    listCategory: [
      {id: 1, name: 'Lips', image: images.lipstick},
      {id: 2, name: 'Vegan', image: images.Nivea_Lotion},
      {id: 3, name: 'Natural', image: images.cream_brands},
      {id: 4, name: 'Dermatologically', image: images.category1},
      {id: 5, name: 'Mascara', image: images.mascara},
      {id: 6, name: 'Popular', image: images.rouge_mac},
    ],
  };
  render() {
    return (
      <View style={styles.container}>
        <HeaderBar
          navigation={this.props.navigation}
          icon={images.ic_menu}
          isIconLeft={true}
          isIconRight={true}
          title={'Beau & Bella'}
          onPressRight={() => {
            this.setState({
              isVisible: false,
            });
          }}
        />
        <View style={styles.searchAndScanContainer}>
          <View style={styles.txtInputContainer}>
            <TextInput
              placeholder="Search products"
              style={styles.txtInputSearch}
            />
            <TouchableOpacity style={styles.btnSearch}>
              <Image source={images.ic_search} style={styles.iconSearch} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Image style={styles.iconScan} source={images.ic_scan} />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.containerCategory}
          data={this.state.listCategory}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
          renderItem={({item, index}) => (
            <ItemCategory
              onPressItem={index => {
                this.setState({indexSelect: index});
              }}
              index={index}
              item={item}
              indexSelect={this.state.indexSelect}
              navigation={this.props.navigation}
            />
          )}
        />
        <LinearGradient
          colors={['red', 'yellow', 'green']}
          style={styles.linearGradient}>
          <Text>Vertical Gradient</Text>
        </LinearGradient>
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
  txtInputContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: sizes._300sdp,
    height: sizes._60sdp,
    backgroundColor: 'rgba(148, 42, 89, 0.08)',
    borderRadius: sizes._60sdp,
  },
  txtInputSearch: {
    flex: 1,
    marginLeft: sizes._20sdp,
    fontSize: sizes._16sdp,
    fontWeight: '400',
  },
  btnSearch: {
    backgroundColor: colors._color_D16F9A,
    width: sizes._60sdp,
    height: sizes._60sdp,
    borderRadius: sizes._60sdp,
    padding: sizes._14sdp,
  },
  iconSearch: {
    width: sizes._32sdp,
    height: sizes._32sdp,
  },
  iconScan: {
    marginLeft: sizes._15sdp,
    width: sizes._32sdp,
    height: sizes._32sdp,
  },
  searchAndScanContainer: {
    marginTop: sizes._40sdp,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  containerCategory: {
    marginTop: sizes._30sdp,
    height: sizes._30sdp,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1,
  },
});
