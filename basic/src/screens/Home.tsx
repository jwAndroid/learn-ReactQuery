import React, {useCallback, useState} from 'react';
import {View, Text} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import Detail from './Detail';

const Home = () => {
  const [username, setUsername] = useState('');
  const queryClient = useQueryClient();

  const onQueryData = useCallback(() => {
    queryClient.setQueryData(['username'], username);
  }, [queryClient, username]);

  const onPress = useCallback(() => {
    setUsername('최지웅!');
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text onPress={onPress} style={{fontSize: 25, color: 'black'}}>
        set username
      </Text>

      <Text
        onPress={onQueryData}
        style={{fontSize: 20, marginTop: 20, color: 'black'}}>
        dispatch
      </Text>

      {username !== '' ? <Detail /> : null}
    </View>
  );
};

export default Home;
