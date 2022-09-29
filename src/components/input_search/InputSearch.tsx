import * as React from 'react';
import {
  Image,
  View,
  StyleSheet,
  TextInput,
  TextInputProperties,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import images from '../../res/images';
import sizes from '../../res/sizes';
import colors from '../../res/colors';
interface InputSearchProps {
  inputProps: TextInputProperties;
  containerStyles?: ViewStyle;
  onSearch?: (value: string) => void;
}
const InputSearch = (props: InputSearchProps) => {
  const [text, setText] = React.useState('');
  const onSearch = React.useCallback((value: string) => {
    setText(value);
    props.onSearch && props.onSearch(value);
  }, []);

  const onDeleteText = React.useCallback(() => {
    setText('');
    props.onSearch && props.onSearch('');
  }, []);
  return (
    <View style={[styles.container, props.containerStyles]}>
      <Image source={images.ic_search} style={styles.icon} />
      <TextInput
        onChangeText={onSearch}
        value={text}
        style={styles.input}
        placeholder="Search Product"
        {...props.inputProps}
      />
      {!!text && (
        <TouchableOpacity onPress={onDeleteText}>
          <Image source={images.ic_delete_search} style={styles.iconDelete} />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default InputSearch;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors._color_white,
    borderColor: colors._color_9095A6,
    borderWidth: sizes._1sdp,
    borderRadius: sizes._40sdp,
    width: sizes._246sdp,
    height: sizes._48sdp,
  },
  icon: {
    color: '#1B153D',
    height: sizes._24sdp,
    width: sizes._24sdp,
    resizeMode: 'contain',
    marginHorizontal: sizes._16sdp,
  },
  input: {
    flex: 1,
    fontSize: sizes._14sdp,
    paddingVertical: sizes._10sdp,
    placeholder: 'Search Product',
    fontWeight: '500',
    lineHeight: 16.44,
  },
  iconDelete: {
    height: sizes._24sdp,
    width: sizes._24sdp,
    resizeMode: 'contain',
    marginRight: sizes._14sdp,
  },
});
