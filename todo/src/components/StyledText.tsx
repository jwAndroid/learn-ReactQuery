import { View, Text } from 'react-native';
import React, { memo } from 'react';

const StyledText = () => {
  return (
    <View>
      <Text>StyledText</Text>
    </View>
  );
};

export default memo(StyledText);
