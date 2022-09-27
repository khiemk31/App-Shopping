import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import TextBase from '../TextViewBase';
import strings from '../../res/strings';
import sizes from '../../res/sizes';
interface NoInternetProps {
  title: string;
}
const NoInternet = (props: NoInternetProps) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: props.title == strings.nonInternet ? 'red' : 'green'},
      ]}>
      <TextBase title={props.title} style={styles.note} />
    </View>
  );
};
export default NoInternet;
const styles = StyleSheet.create({
  container: {
    top: sizes._header_height,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'red',
    paddingVertical: sizes._5sdp,
  },
  image: {
    height: sizes._150sdp,
    width: sizes._150sdp,
    resizeMode: 'contain',
    marginBottom: sizes._10sdp,
  },
  note: {
    fontSize: sizes._16sdp,
    color: 'white',
  },
});
