import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ThemeStatic, Typography } from '@app/theme';

const { FontWeights, FontSizes } = Typography;

interface IconButtonProps {
  Icon: React.FC,
  onPress: () => void,
  style?: StyleProp<ViewStyle>,
  hasBadge?: boolean
  badgeCount?: number
};

const IconButton: React.FC<IconButtonProps> = ({ Icon, onPress, style, hasBadge, badgeCount }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.95} style={[styles.container, style]}>
    <Icon />
    {hasBadge && <View style={styles.badge}>
      <Text style={styles.badgeText}>{badgeCount}</Text>
    </View>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    width: 40
  },
  badge: {
    position: 'absolute',
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    top: -10,
    right: -10,
    borderRadius: 20,
    backgroundColor: ThemeStatic.badge
  },
  badgeText: {
    ...FontWeights.Regular,
    ...FontSizes.Caption,
    color: ThemeStatic.white
  }
});

export default IconButton;