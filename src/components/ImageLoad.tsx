import * as React from 'react';
import {Image, ImageSourcePropType, ImageStyle, StyleSheet} from 'react-native';
import sizes from '../res/sizes';

interface ImageLoadProps {
  image: string;
  imageDefault?: ImageSourcePropType;
  styles?: ImageStyle;
}

const ImageLoad = (props: ImageLoadProps) => {
  const [dedaultImage, setDedaultImage] = React.useState(false);

  const onImageError = (err: any) => {
    if (!dedaultImage) {
      setDedaultImage(true);
    }
  };
  return (dedaultImage && props.imageDefault) || !props.image ? (
    <Image source={props.imageDefault} style={[styles.image, props.styles]} />
  ) : (
    <Image
      source={{uri: props.image}}
      style={[styles.image, props.styles]}
      onError={onImageError}
    />
  );
};

export default ImageLoad;

const styles = StyleSheet.create({
  image: {
    height: sizes._40sdp,
    width: sizes._40sdp,
    resizeMode: 'cover',
    borderRadius: sizes._20sdp,
  },
});
