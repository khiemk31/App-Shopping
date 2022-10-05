import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import colors from '../../../res/colors';
import {Image, View, StyleSheet, Text} from 'react-native';
import HomeScreen from '../home/HomeScreen';
import CartScreen from '../cart/CartScreen';
import FavoriteScreen from '../favorite/FavoriteScreen';
import ProfileScreen from '../profile/ProfileScreen';
import sizes from '../../../res/sizes';
import images from '../../../res/images';

const Tab = createMaterialBottomTabNavigator();

const BottomTabsNavigator = (): any => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      labeled={false}
      barStyle={{
        position: 'absolute',
        backgroundColor: 'rgba(255, 221, 221, 1)',
        marginHorizontal: sizes._20sdp,
        paddingHorizontal: sizes._10sdp,
        borderRadius: sizes._100sdp,
        bottom: sizes._30sdp,
        paddingVertical: sizes._10sdp,
      }}
      screenOptions={
        {
          // headerShown: false,
        }
      }
      tabBarOptions={{
        activeTintColor: '#EA0029',
        inactiveTintColor: '#BBBBBB',
        // activeTintColor: colors._color_black,
      }}>
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  height: 70,
                }}>
                <Image source={images.ic_home} style={styles.iconFocused} />
                <Text
                  style={{
                    marginTop: 20,
                    color: colors._text_black,
                    flex: 1,
                    fontSize: 20,
                  }}>
                  Giỏ hàng
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  height: 70,
                }}>
                <Image source={images.ic_home} style={styles.iconUnFocused} />
                <Text
                  style={{
                    flex: 1,
                    marginTop: 20,
                    color: colors._text_black,
                    fontSize: 20,
                  }}>
                  Giỏ hàng
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Giỏ hàng"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Image source={images.ic_cart} style={styles.iconFocused} />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Image source={images.ic_cart} style={styles.iconUnFocused} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Yêu thích"
        component={FavoriteScreen}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Image
                  source={images.ic_favourite}
                  style={styles.iconFocused}
                />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Image
                  source={images.ic_favourite}
                  style={styles.iconUnFocused}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Thông tin"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Image source={images.ic_profile} style={styles.iconFocused} />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Image
                  source={images.ic_profile}
                  style={styles.iconUnFocused}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabsNavigator;
const styles = StyleSheet.create({
  iconFocused: {
    marginBottom: sizes._10sdp,
    height: sizes._32sdp,
    width: sizes._32sdp,
    tintColor: colors._color_9A3763,
  },
  iconUnFocused: {
    marginBottom: sizes._10sdp,
    height: sizes._32sdp,
    width: sizes._32sdp,
    tintColor: colors._color_black,
  },
});
