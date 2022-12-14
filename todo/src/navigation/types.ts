import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/* MainTab */
export type MainTabParamList = {
  Todo: undefined;
  Favorit: undefined;
  Bin: undefined;
};

export type MainTabNavigationScreenParams = NavigatorScreenParams<MainTabParamList>;

export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;
export type MainTabRouteProp = RouteProp<RootStackParamList, 'MainTab'>;

/* RootStack */
export type RootStackParamList = {
  MainTab: MainTabNavigationScreenParams;
  Setting: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
