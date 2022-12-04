import React, { memo, useCallback, useMemo } from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { MainTabParamList, RootStackNavigationProp } from './types';
import { BinScreen, FavoritScreen, TodoScreen } from './screens';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { Navigator, Screen } = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressSettings = useCallback(() => {
    navigation.navigate('Setting');
  }, []);

  const screenOptions = useMemo<BottomTabNavigationOptions>(
    () => ({
      headerRight: () => (
        <Pressable style={{ marginRight: 10 }} onPress={onPressSettings}>
          <MaterialIcons name="settings" size={25} />
        </Pressable>
      ),
    }),
    [],
  );

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen
        name="Todo"
        component={TodoScreen}
        options={{
          title: 'Todo',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="article" color={color} size={size} />
          ),
        }}
      />

      <Screen
        name="Favorit"
        component={FavoritScreen}
        options={{
          title: 'Favorit',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="grade" color={color} size={size} />,
        }}
      />

      <Screen
        name="Bin"
        component={BinScreen}
        options={{
          title: 'Bin',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="delete" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
}

export default memo(MainTab);
