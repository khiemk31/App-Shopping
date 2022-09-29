import {createStackNavigator} from '@react-navigation/stack';
import {createCompatNavigatorFactory} from '@react-navigation/compat';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import HomeScreen from '../home/HomeScreen';
import LoginScreen from '../login/LoginScreen';
import SplashScreen from '../splash_screen/SplashScreen';
export enum ScreenName {
  LOGIN = 'LoginScreen',
  HOME = 'HomeScreen',
  SPLASH = 'SplashScreen',
}

const AppNavigator = createCompatNavigatorFactory(createStackNavigator)(
  {
    HomeScreen: {screen: HomeScreen},
    LoginScreen: {screen: LoginScreen},
    SplashScreen: {screen: SplashScreen},
  },
  {
    headerMode: 'none',
    initialRouteName: ScreenName.SPLASH,
  },
);

/**********************************************************************************************************************************
 *
 * Implement switch navigator
 *
 **********************************************************************************************************************************/

const switchNavigator = createSwitchNavigator(
  {
    AppNavigator: AppNavigator,
  },
  {
    initialRouteName: 'AppNavigator',
  },
);

const AppContainer = createAppContainer(switchNavigator);
export default AppContainer;
