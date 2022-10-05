import {createStackNavigator} from '@react-navigation/stack';
import {createCompatNavigatorFactory} from '@react-navigation/compat';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import HomeScreen from '../home/HomeScreen';
import LoginScreen from '../login/LoginScreen';
import SplashScreen from '../splash_screen/SplashScreen';
import CartScreen from '../cart/CartScreen';
import ProfileScreen from '../profile/ProfileScreen';
import FavoriteScreen from '../favorite/FavoriteScreen';
import BottomTabsNavigator from '../bottom_tabs_navigator/BottomTabsNavigator';
export enum ScreenName {
  LOGIN = 'LoginScreen',
  HOME = 'HomeScreen',
  SPLASH = 'SplashScreen',
  CART = 'CartScreen',
  FAVORITE = 'FavoriteScreen',
  PROFILE = 'ProfileScreen',
  BOTTOMTABS = 'BottomTabsNavigator',
}

const AppNavigator = createCompatNavigatorFactory(createStackNavigator)(
  {
    HomeScreen: {screen: HomeScreen},
    LoginScreen: {screen: LoginScreen},
    SplashScreen: {screen: SplashScreen},
    CartScreen: {screen: CartScreen},
    ProfileScreen: {screen: ProfileScreen},
    FavoriteScreen: {screen: FavoriteScreen},
    BottomTabsNavigator: {screen: BottomTabsNavigator},
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
