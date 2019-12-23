import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconSizes } from '../../constants';
import { ThemeStatic } from '../../theme';

const DeleteCardRightActions = ({ progress, dragX, onDelete }) => {
  const translateX = dragX.interpolate({
    inputRange: [0, 80, 100, 101],
    outputRange: [-10, 0, 0, 1]
  });

  const slideEffect = { opacity: progress, transform: [{ translateX }] };

  return (
    <Animated.View style={[styles.container, slideEffect]}>
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
    borderTopRightRadius: 2.5,
    borderBottomRightRadius: 2.5
  },
  delete: {
    width: 50,
    textAlign: 'center'
  }
});

export default DeleteCardRightActions;