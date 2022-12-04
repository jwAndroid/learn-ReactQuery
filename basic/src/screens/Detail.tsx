import {View, Text} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';

const Detail = () => {
  const {data: username} = useQuery(['username'], {
    initialData: '',
    staleTime: Infinity,
  });

  return (
    <View>
      <Text>{username}</Text>
    </View>
  );
};

export default Detail;
