import React from 'react';
import { View, Text } from 'react-native';

/* eslint-disable-next-line */
export interface SharedProps {
}

export function Shared(props: SharedProps) {
  return (
    <View>
      <Text>Welcome to shared!</Text>
    </View>
  );
}

export default Shared;
