import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface IconButtonProps {
  Icon: React.FC,
  onPress: any
};

const IconButton: React.FC<IconButtonProps> = ({ Icon, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.95} style={styles.container}>
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