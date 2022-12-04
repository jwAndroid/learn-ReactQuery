import React, { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTab from './MainTab';
import { RootStackParamList } from './types';
import { SettingScreen } from './screens';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Navigator
      screenOptions={{
        headerBackTitle: '닫기',
      }}>
      <Screen name="MainTab" component={MainTab} options={{ headerShown: false }} />

      <Screen name="Setting" component={SettingScreen} />
    </Navigator>
  );
}

export default memo(RootStack);
