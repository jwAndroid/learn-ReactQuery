import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { isSignup } from './TodoScreen';

const FavoritScreen = () => {
  const query = useQueryClient();

  const data = query.getQueryData<boolean>([isSignup]);

  console.log(data);

  return (
    <View>
      <Text>FavoritScreen</Text>
    </View>
  );
};

export default memo(FavoritScreen);
