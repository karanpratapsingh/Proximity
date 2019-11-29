import React from 'react';
import { StyleSheet, TouchableOpacity, StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

interface IconButtonProps {
  Icon: React.FC,
  onPress: any,
  style?: StyleProp<ViewStyle>
};

const IconButton: React.FC<IconButtonProps> = ({ Icon, onPress, style }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.95} style={[styles.container, style]}>
    <Icon />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    width: 40
  }
});

export default IconButton;