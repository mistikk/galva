/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {SafeAreaView, View, Text, Button} from 'react-native';
import {connect} from 'react-redux';

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../config/api';
import {updateUser} from '../redux/actions/userAction';

class Login extends Component {
  _login = async () => {
    const {navigation, dispatch} = this.props;
    const username = 'bahri';
    const userCode = 'c5';
    const password = 'b123';

    const text = `CompanyPartner/${userCode}/${username}/${password}`;
    auth()
      .signInWithEmailAndPassword('test2@test2.com', '123456')
      .then(result => {
        api.get(text).then(async response => {
          await AsyncStorage.setItem('@url', text);
          dispatch(updateUser(response.data.COMPANY_ID));
          navigation.navigate('auth');
        });
      })
      .catch(err => {
        console.log('err :', err);
      });
  };

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Login</Text>
        </View>
        <Button onPress={() => this._login()} title="Login" />
      </SafeAreaView>
    );
  }
}

export default connect()(Login);
