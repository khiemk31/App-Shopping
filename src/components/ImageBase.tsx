import React, {Component} from 'react';
import {Image, View, ImageStyle} from 'react-native';
import sizes from '../res/sizes';

type Props = {
  imageSource: any;
  style?: ImageStyle;
  height?: number;
  width?: number;
  boderRadius?: number;
};

type State = {};

class ImageBase extends Component<Props, State> {
  render() {
    const {height, width, boderRadius,style} = this.props;
    return (
      <View>
        <Image
          {...this.props}
          resizeMode={'contain'}
          source={this.props.imageSource}
          style={{
              
              ...style,
              height: height ? height : sizes._30sdp,
              width: width ? width : sizes._30sdp
            }
          }
        />
      </View>
    );
  }
}

export default ImageBase;
