import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MemberState, queryKey } from './TodoScreen';

const SettingScreen = () => {
  const queryClient = useQueryClient();

  const members = queryClient.getQueryData<MemberState[]>([queryKey]);

  console.log(JSON.stringify(members, null, 5));

  return <View />;
};

export default memo(SettingScreen);
