import React, { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTab from './MainTab';
import { RootStackParamList } from './types';

const { Navigator, Screen } =
  createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Navigator>
      <Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}

export default memo(RootStack);
