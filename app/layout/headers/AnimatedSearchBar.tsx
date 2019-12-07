import React, { useContext, useRef, useState } from 'react';
import { Platform, Keyboard, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import { AppContext } from '../../context';
import { Typography } from '../../theme';
import { ThemeColors } from '../../types/theme';

const { FontWeights, FontSizes } = Typography;

interface AnimatedSearchBarProps {
  value: string,
  onChangeText: any,
  onFocus?: any,
  onBlur?: any,
  placeholder: string,
  style?: object
};

const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = ({ value, onChangeText, onFocus, onBlur, placeholder, style }) => {

  const { theme } = useContext(AppContext);

  const [barWidth, setBarWidth] = useState(90);
  const [cancelWidth, setCancelWidth] = useState(0);
  const transitionRef = useRef();

  const onOpen = () => {
    // @ts-ignore
    transitionRef.current.animateNextTransition();
    setBarWidth(75);
    setCancelWidth(70);
    onFocus();
  };

  const onCancel = () => {
    // @ts-ignore
    transitionRef.current.animateNextTransition();
    setBarWidth(90);
    setCancelWidth(0);
    Keyboard.dismiss();
    onChangeText('');
    onBlur();
  };

  const transition = <Transition.Change interpolation='easeInOut' />;

  return (
    <Transitioning.View
      style={styles().container}
      // @ts-ignore
      ref={transitionRef}
      transition={transition}>
      <TextInput
        autoCorrect={false}
        onFocus={onOpen}
        style={[styles(theme).animatedSearchBar, { width: `${barWidth}%` }, style]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.text02}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        activeOpacity={0.90}
        onPress={onCancel}
        style={[styles().cancel, { width: cancelWidth }]}>
        <Text style={[styles(theme).cancelText, { color: cancelWidth ? theme.text01 : theme.white }]}>Cancel</Text>
      </TouchableOpacity>
    </Transitioning.View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5
  },
  animatedSearchBar: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    marginLeft: 20,
    paddingVertical: Platform.select({ ios: 10, android: 5 }),
    paddingHorizontal: 20,
    backgroundColor: theme.placeholder,
    color: theme.text01,
    borderRadius: 20,
    marginVertical: 5
  },
  cancel: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelText: {
    ...FontWeights.Light,
    ...FontSizes.Body
  }
});

export default AnimatedSearchBar;