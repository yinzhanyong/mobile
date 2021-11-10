import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import TouchableRipple from './TouchableRipple';

const PressableCard = ({ style, onPress, children, contentContainerStyle }) => {
  const theme = useTheme();
  return (
    <TouchableRipple
      style={[
        {
          backgroundColor: theme.colors.onSurface,
          borderColor: theme.colors.borderColor,
          // borderColor: 'grey',
          marginVertical: 4,
          borderRadius: 8,
          marginHorizontal: 8,
          borderWidth: 1,
          shadowColor: '#000',
          shadowRadius: 10,
          overflow: 'hidden',
          shadowOpacity: 1,
          elevation: 6,
        },
        style,
      ]}
      onPress={onPress}
    >
      <View>{children}</View>
    </TouchableRipple>
  );
};

export default PressableCard;
