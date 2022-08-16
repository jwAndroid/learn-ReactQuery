import { useNavigation } from '@react-navigation/core';
import { useMutation } from 'react-query';

import { RootStackNavigationProp } from '../navigation/types';
import { useUserState } from '../contexts/UserContext';
import { login } from '../api/auth';
import { AuthError } from '../api/type';
import { applyToken } from '../api/client';
import authStorage from '../storages/authStorage';
import useInform from './useInform';

export default function useLogin() {
  const inform = useInform();

  const [, setUser] = useUserState();

  const navigation = useNavigation<RootStackNavigationProp>();

  // 로그인 해서 성공이나 실패 했을때 authform 에서
  const mutation = useMutation(login, {
    onSuccess: (data) => {
      setUser(data.user);

      navigation.pop();

      applyToken(data.jwt);

      authStorage.set(data);
    },
    onError: (error: AuthError) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        '로그인 실패';

      inform({
        title: '오류',
        message,
      });
    },
  });

  return mutation;
}
