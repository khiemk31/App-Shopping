import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import TextBase from '../TextViewBase';
import sizes from '../res/sizes';
import fonts from '../res/fonts';
import colors from '../res/colors';

interface EmptyComponentProps {
  image?: ImageSourcePropType;
  title: string;
  containerStyle?: ViewStyle;
  styleImage?: ImageStyle;
  styleTitle?: TextStyle | any;
}

const EmptyComponent = React.memo((props: EmptyComponentProps) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.image && (
        <Image style={[styles.image, props.styleImage]} source={props.image} />
      )}
      <TextBase style={[styles.noti, props.styleTitle]} title={props.title} />
    </View>
  );
});

export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: sizes._20sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: sizes._128sdp,
    height: sizes._80sdp,
    resizeMode: 'contain',
  },
  noti: {
    fontFamily: fonts.HelveticaNeueRegular,
    fontSize: sizes._14sdp,
    color: colors._text_white,
    marginTop: sizes._10sdp,
  },
});
