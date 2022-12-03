import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';

import { MainTabParamList } from './types';
import { BinScreen, FavoritScreen, TodoScreen } from './screens';

const { Navigator, Screen } = createBottomTabNavigator<MainTabParamList>();

// https://oblador.github.io/react-native-vector-icons/

function MainTab() {
  return (
    <Navigator>
      <Screen
        name="Todo"
        component={TodoScreen}
        options={{
          title: 'Todo',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="folder-o" color={color} size={size} />
          ),
        }}
      />

      <Screen
        name="Favorit"
        component={FavoritScreen}
        options={{
          title: 'Favorit',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="user" color={color} size={size} />,
        }}
      />

      <Screen
        name="Bin"
        component={BinScreen}
        options={{
          title: 'Bin',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bitbucket" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
}

export default memo(MainTab);
