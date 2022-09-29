import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../redux/actions';
import {ENABLE_BANNER, ShowBanner} from '../../../sdk/AdSdk';

interface Props {
  setReduxState: (state: Object) => Promise<void>;
  children: any;
  totalMessUnRead?: number;
}

class RootView extends Component<Props> {
  componentDidMount = () => {};

  componentWillUnmount = () => {};
  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
        {ENABLE_BANNER && <ShowBanner />}
      </View>
    );
  }
}
export default connect(
  state => {
    return _.pick(state, ['totalMessUnRead']);
  },
  dispatch => bindActionCreators(actions, dispatch),
)(RootView);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
