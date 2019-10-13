import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import Home from '../screens/home';
import About from '../screens/about';
import Splash from '../screens/splash';
import Login from '../screens/login';

const AppStackNavigator = createStackNavigator({
  bir: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      // header: headerProps => {
      //   console.log('headerProps :', headerProps);
      //   return <IconAntDesign name="meh" size={30} color="#900" />;
      // },
    },
  },
  iki: {
    screen: About,
    path: '',
    navigationOptions: {
      title: 'About',
    },
  },
});

const AppBottomNavigator = createBottomTabNavigator(
  {
    normal: {
      screen: AppStackNavigator,
      navigationOptions: {
        tabBarIcon: <IconAntDesign name="meh" size={30} color="#900" />,
      },
    },
    login: {
      screen: About,
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'blue',
      },
    },
  },
);

const AppDrawerNavigator = createDrawerNavigator({
  sayfa2: {
    screen: AppBottomNavigator,
  },
  home: {
    screen: About,
  },
});

const AppSwithNavigator = createSwitchNavigator({
  splash: Splash,
  auth: AppDrawerNavigator,
  noAuth: {
    screen: Login,
  },
});

export default createAppContainer(AppSwithNavigator);
