import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Category} from '../../../../common/Type';
import TextViewBase from '../../../../components/TextViewBase';
import colors from '../../../../res/colors';
import sizes from '../../../../res/sizes';
import BaseComponent from '../../base/BaseComponent';

interface States {}
interface Props {
  navigation: any;
  item: Category;
  index: number;
  indexSelect?: number;
  onPressItem: (index: number) => void;
}

export default class ItemCategory extends BaseComponent<Props, States> {
  state: States = {
    data: [],
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPressItem(this.props.index);
        }}
        style={{
          alignItems: 'center',
          width: sizes._65sdp,
        }}>
        <Image
          style={styles.imageSupCategory}
          source={this.props.item.image}
          resizeMode="stretch"
        />
        <TextViewBase
          numberOfLines={1}
          style={[
            styles.textSupCategory,
            {
              color:
                this.props.index == this.props.indexSelect
                  ? '##040302'
                  : '#6A6A6A',
            },
          ]}>
          {this.props.item.name}
        </TextViewBase>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  supCategory: {
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes._65sdp,
    height: sizes._65sdp,
    borderRadius: sizes._20sdp,
  },
  imageSupCategory: {
    width: sizes._65sdp,
    height: sizes._65sdp,
    borderRadius: sizes._20sdp,
  },
  textSupCategory: {
    marginTop: sizes._20sdp,
    fontSize: sizes._13sdp,
    fontWeight: '400',
    lineHeight: 18,
    color: colors._color_333333,
  },
});
