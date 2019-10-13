/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Button,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {AreaChart, Grid, BarChart} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import auth from '@react-native-firebase/auth';
import {getSevkiyat} from '../services/sevkiyat';

class App extends Component {
  state = {
    sevkiyatlar: [],
  };
  _logout = () => {
    const {navigation} = this.props;

    auth()
      .signOut()
      .then(() => {
        navigation.navigate('noAuth');
      });
  };

  componentDidMount() {
    const {companyId} = this.props;
    if (companyId) {
      getSevkiyat(companyId).then(response => {
        const result = [];
        Object.keys(response.data[0]).map(item => {
          if (item !== 'CURRENTROW') {
            result.push(parseInt(response.data[0][item], 10));
          }
        });
        this.setState({
          sevkiyatlar: result,
        });
      });
    }
  }

  render() {
    const {sevkiyatlar} = this.state;
    console.log('sevkiyatlar :', sevkiyatlar);

    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <IconFontAwesome name="rocket" size={30} color="#900" />
          <IconAntDesign name="meh" size={30} color="#900" />
          <Button onPress={() => this._logout()} title="Logout" />
          <AreaChart
            style={{height: 200}}
            data={sevkiyatlar}
            contentInset={{top: 30, bottom: 30}}
            curve={shape.curveNatural}
            svg={{fill: 'rgba(134, 65, 244, 0.8)'}}>
            <Grid />
          </AreaChart>
          <BarChart
            style={{height: 200}}
            data={sevkiyatlar}
            svg={{fill: 'rgb(134, 65, 244)'}}
            contentInset={{top: 30, bottom: 30}}>
            <Grid />
          </BarChart>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
const mapStateToProps = state => ({
  companyId: state.user.companyId,
});

export default connect(mapStateToProps)(App);
