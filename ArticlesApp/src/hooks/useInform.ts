import { Alert, Platform, ToastAndroid } from 'react-native';
import { useCallback } from 'react';

interface InformParams {
  title: string;
  message: string;
}

export default function useInform() {
  const inform = useCallback(({ title, message }: InformParams) => {
    if (Platform.OS === 'ios') {
      Alert.alert(title ?? '알림', message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }, []);

  return inform;
}
