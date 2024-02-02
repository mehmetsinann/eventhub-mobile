import React from 'react';

import {Provider} from 'react-redux';

import Navigation from './src/navigation';

import store from './src/redux/store';
import {StatusBar} from 'react-native';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar barStyle="default" />
      <Navigation />
    </Provider>
  );
}

export default App;
