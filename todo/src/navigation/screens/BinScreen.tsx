import { View, Text } from 'react-native';
import React, { memo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const BinScreen = () => {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<number[] | null>(['list']);

  return (
    <View>
      <Text>{data}</Text>
    </View>
  );
};

export default memo(BinScreen);
