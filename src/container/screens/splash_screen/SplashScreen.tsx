import moment from 'moment';
import React from 'react';
import {ImageBackground} from 'react-native';
import {mobileLoadingService} from '../../../components/Loading';
import colors from '../../../res/colors';
import images from '../../../res/images';
import {ScreenName} from '../base/AppContainer';
import BaseComponent, {BaseProps, BaseState} from '../base/BaseComponent';
import NavigationService from '../base/NavigationService';
interface Props extends BaseProps {}
interface State extends BaseState {
  loading?: boolean;
}
export default class SplashScreen extends BaseComponent<Props, State> {
  state = {
    loading: true,
  };

  timeStart: moment.Moment = moment();
  _startCountdownTime() {
    setTimeout(() => {
      this.setState({loading: false}, () => {
        this.onFinish();
      });
    }, 5000);
  }

  _initData = async () => {
    mobileLoadingService.loading = false;
  };
  componentDidMount() {}
  async componentWillMount() {
    // await AsyncStorage.setItem('IS_HOME', 'true');
    this._startCountdownTime();
  }
  onFinish = async () => {
    NavigationService.reset(ScreenName.HOME);
  };
  componentWillUnmount = () => {};

  render() {
    return (
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          alignItems: 'center',
          backgroundColor: colors._color_backgound,
        }}
        imageStyle={{resizeMode: 'stretch'}}
        resizeMode={'stretch'}
        source={images.Splash}>
        {/* <TextViewBase
          style={{
            textAlign:'center',
            fontFamily: 'SF Pro Display',
            fontSize: sizes._35sdp,
            fontWeight: 'bold',
            color: '#3F3F3F',
            marginTop: sizes._155sdp,
            marginHorizontal: sizes._35sdp,
          }}
          numberOfLines={2}
          >
          Everything you        can imagine is real
        </TextViewBase> */}
      </ImageBackground>
    );
  }
}
