import React from 'react';
import { Animated, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconSizes } from '@app/constants';
import { ThemeStatic } from '@app/theme';

interface DeleteCardRightActionsProps {
 progress: any,
 dragX: any,
 onDelete: () => void,
 style?: StyleProp<ViewStyle>
};

const DeleteCardRightActions: React.FC<DeleteCardRightActionsProps> = ({ progress, dragX, onDelete, style }) => {
  const translateX = dragX.interpolate({
    inputRange: [0, 80, 100, 101],
    outputRange: [-10, 0, 0, 1]
  });

  const slideEffect = { opacity: progress, transform: [{ translateX }] };

  return (
    <Animated.View style={[styles.container, slideEffect, style]}>
      <MaterialIcons
        name='delete'
        onPress={onDelete}
        color={ThemeStatic.white}
        size={IconSizes.x6}
        style={styles.delete}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeStatic.delete,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  delete: {
    width: 50,
    textAlign: 'center'
  }
});

export default DeleteCardRightActions;