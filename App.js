/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import RootNavigation from './src/navigation'
import 'react-native-gesture-handler'

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle = "light-content"/>
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <RootNavigation/>
      </SafeAreaView>
    </>
  );
};

export default App;
