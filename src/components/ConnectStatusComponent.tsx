import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import sizes from '../../src/res/sizes';
import colors from '../../src/res/colors';
import TextBase from './TextViewBase';
import strings from '../../src/res/strings';

interface ConnectStatusProps {
  message?: string;
}

interface ConnectStatusState {
  isVisible: boolean;
}

class ConnectStatusComponent extends React.PureComponent<
  ConnectStatusProps,
  ConnectStatusState
> {
  state: ConnectStatusState = {
    isVisible: false,
  };

  showMessage = () => {
    this.setState({
      isVisible: true,
    });
  };

  hideMessage = () => {
    this.setState({
      isVisible: false,
    });
  };

  render() {
    return this.state.isVisible ? (
      <View style={styles.container}>
        <TextBase
          title={this.props.message ? this.props.message : strings.doConnect}
          style={styles.note}
        />
      </View>
    ) : (
      <View />
    );
  }
}

export default ConnectStatusComponent;

const styles = StyleSheet.create({
  container: {
    top: sizes._header_height,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: colors._color_button_kitchen,
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
