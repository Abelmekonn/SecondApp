import React from 'react';
import { Text, View } from 'react-native';
import configureDeviceContext from './config/useDeviceContext';

export default function App() {
  configureDeviceContext();

  return (
    <View>
      <Text>Welcome to React Native</Text>
    </View>
  );
}
