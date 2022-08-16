import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { MainTabParamList } from './types';
import { ArticlesScreen, UserMenuScreen } from './screens';

const { Navigator, Screen } =
  createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  return (
    <Navigator>
      <Screen
        name="Articles"
        component={ArticlesScreen}
        options={{
          title: '게시글 목록',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="article" color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="UserMenu"
        component={UserMenuScreen}
        options={{
          title: '메뉴',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
}

export default memo(MainTab);
