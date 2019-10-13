/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {connect} from 'react-redux';

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../config/api';
import {updateUser} from '../redux/actions/userAction';

class Splash extends Component {
  componentDidMount() {
    const {navigation, dispatch} = this.props;

    this.unsubscribe = auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        AsyncStorage.getItem('@url').then(result => {
          if (result) {
            api
              .get(result)
              .then(response => {
                dispatch(updateUser(response.data.COMPANY_ID));
                navigation.navigate('auth');
              })
              .catch(() => {
                navigation.navigate('noAuth');
              });
          }
        });
      } else {
        navigation.navigate('noAuth');
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Splash</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect()(Splash);
