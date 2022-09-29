import * as React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import BaseComponent from '../../../screens/base/BaseComponent';
import ImageViewer from 'react-native-image-zoom-viewer';
import images from '../../res/images';
import sizes from '../../res/sizes';
import colors from '../../res/colors';

interface Props {
  navigation: any;
  listImageViewer: any;
}
interface State {
  showImageViewer: boolean;
  indexImage: number;
}

export default class ImageViewerComponent extends BaseComponent<Props, State> {
  state: State = {
    showImageViewer: false,
    indexImage: 0,
  };

  _closeImageViewer = () => {
    this.setState({showImageViewer: false});
  };

  showImage = (index: number) => {
    this.setState({
      showImageViewer: true,
      indexImage: index,
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Modal
          visible={this.state.showImageViewer}
          transparent={true}
          onRequestClose={() => {
            this.setState({showImageViewer: false});
          }}>
          <ImageViewer
            imageUrls={this.props.listImageViewer}
            enableSwipeDown={true}
            index={this.state.indexImage}
            onSwipeDown={this._closeImageViewer}
            renderHeader={() => {
              return (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => this._closeImageViewer()}>
                  <Image source={images.ic_close} />
                </TouchableOpacity>
              );
            }}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    // top: 10,
    right: 0,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: sizes._30sdp,
    height: sizes._30sdp,
    borderRadius: sizes._15sdp,
    backgroundColor: colors._color_gray2,
    marginRight: sizes._20sdp,
    marginTop: sizes._20sdp,
    top:
      Platform.OS == 'ios'
        ? sizes._statusbar_height + sizes._10sdp
        : sizes._statusbar_height + sizes._10sdp,
  },
});
