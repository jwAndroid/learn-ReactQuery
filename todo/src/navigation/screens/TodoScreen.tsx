import React, { memo, useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';

export const queryKey = 'member';
export const isSignup = 'isSignup';

export interface MemberState {
  id: number;
  name: string;
}

const DUMMY = [
  { id: 0, name: 'qwewqe' },
  { id: 1, name: 'sadge' },
  { id: 2, name: 'efeefefc' },
  { id: 3, name: 'qwe213wqe' },
  { id: 4, name: 'saddwdge' },
  { id: 5, name: 'efefeefefc' },
  { id: 6, name: 'qwewesafqe' },
  { id: 7, name: 'sad12ge' },
  { id: 8, name: 'efeeg3efefc' },
  { id: 9, name: 'qwewesafqe' },
  { id: 10, name: 'sad12ge' },
  { id: 11, name: 'efeeg3efefc' },
  { id: 12, name: 'efeeg3efefc' },
];

const TodoScreen = () => {
  const query = useQueryClient();

  query.setQueryData<MemberState[] | null | undefined>([queryKey], DUMMY);

  const onPress = useCallback(() => {
    query.setQueryData<MemberState[] | null | undefined>(
      [queryKey],
      DUMMY.filter(data => data.id > 5),
    );
  }, []);

  return <Text onPress={onPress}>push</Text>;
};

export default memo(TodoScreen);
