import React, { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTab from './MainTab';
import { RootStackParamList } from './types';
import { ArticleScreen } from './screens';

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

      <Screen name="Article" component={ArticleScreen} />
    </Navigator>
  );
}

export default memo(RootStack);
