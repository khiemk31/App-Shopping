import * as React from 'react';
import {StyleProp, View, ViewStyle, Image} from 'react-native';
import uuid from 'uuid';
import images from '../res/images';
import _ from 'lodash';
import sizes from '../res/sizes';
import LottieView from 'lottie-react-native';
export interface ChangeListener {
  (event: any): any;
}

class MobileLoadingService {
  private onChangeListenerKeys: any[] = [];
  private onChangeListeners: ChangeListener[] = [];

  subscribe(key: string | ChangeListener, listener: ChangeListener) {
    if (typeof key === 'string') {
      if (this.onChangeListenerKeys.indexOf(key) !== -1) return;
      if (this.onChangeListeners.indexOf(listener) !== -1) return;
      this.onChangeListenerKeys.push(key);
      this.onChangeListeners.push(listener);
    } else {
      this.onChangeListenerKeys.push(uuid());
      this.onChangeListeners.push(key);
    }
  }

  unsubcribe(key: string | ChangeListener) {
    let index = -1;
    if (typeof key === 'string') {
      index = this.onChangeListenerKeys.indexOf(key);
      this.onChangeListeners.splice(index, 1);
    } else {
      index = this.onChangeListenerKeys.indexOf(key);
    }
    if (index === -1) return;
    this.onChangeListeners.splice(index, 1);
  }

  fire(event: any) {
    this.onChangeListeners.forEach(listener => listener(event));
  }

  set loading(value: boolean) {
    this.fire(value);
  }
}
export const mobileLoadingService = new MobileLoadingService();

export class Loading extends React.PureComponent<
  {style?: StyleProp<ViewStyle>},
  {loading: boolean}
> {
  state = {
    loading: false,
  };

  private loadingStack: number[] = [];

  constructor(props: {style?: StyleProp<ViewStyle>}) {
    super(props);

    mobileLoadingService.subscribe('onLoading', loading => {
      if (loading) {
        this.loadingStack.push(1);
      } else {
        this.loadingStack.pop();
      }
      if (this.loadingStack.length === 0) {
        setTimeout(() => {
          if (this.state.loading) {
            this.setState({
              loading: false,
            });
          }
        }, 2000);
      } else {
        if (!this.state.loading) {
          this.setState({
            loading: true,
          });
        }
      }
    });
  }

  componentWillUnmount() {
    mobileLoadingService.unsubcribe('onLoading');
  }

  render() {
    return (
      <View
        style={
          this.state.loading
            ? [this.props.style, {backgroundColor: 'transparent'}]
            : {display: 'none'}
        }>
        {this.state.loading && (
          <LottieView
            style={{
              width: sizes._120sdp,
              height: sizes._120sdp,
            }}
            source={require('../assets/lottie/loading.json')}
            autoPlay
            loop
          />
        )}
      </View>
    );
  }
}
