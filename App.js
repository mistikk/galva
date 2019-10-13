import React from 'react';
import {Provider} from 'react-redux';

import store from './src/redux/store';
import Navigation from './src/config/routes';

export default () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
