import React, { useContext, useState } from 'react';
import { Keyboard, Platform, StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import posed from 'react-native-pose';
import { AppContext } from '@app/context';
import { Typography } from '@app/theme';
import { ThemeColors } from '@app/types/theme';

const { FontWeights, FontSizes } = Typography;

interface AnimatedSearchBarProps {
  value: string,
  onChangeText: (text: string) => void,
  onFocus?: any,
  onBlur?: any,
  placeholder: string,
  style?: StyleProp<ViewStyle>
};

const TransitionInput = posed(TextInput)({
  focused: { width: '75%' },
  notFocused: { width: '90%' }
});

const TransitionTouchableOpacity = posed(TouchableOpacity)({
  focused: { width: 70 },
  notFocused: { width: 0 }
});

const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = ({ value, onChangeText, onFocus, onBlur, placeholder, style }) => {

  const { theme } = useContext(AppContext);
  const [focused, setFocused] = useState(false);

  const onOpen = () => {
    setFocused(true);
    onFocus();
  };

  const onCancel = () => {
    setFocused(false);
    Keyboard.dismiss();
    onChangeText('');
    onBlur();
  };

  const pose = focused ? 'focused' : 'notFocused';

  return (
    <View style={styles().container}>
      <TransitionInput
        pose={pose}
        onFocus={onOpen}
        style={[styles(theme).animatedSearchBar, style]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.text02}
        onChangeText={onChangeText}
      />
      <TransitionTouchableOpacity
        pose={pose}
        activeOpacity={0.90}
        onPress={onCancel}
        style={[styles().cancel]}>
        <Text style={styles(theme).cancelText}>Cancel</Text>
      </TransitionTouchableOpacity>
    </View>
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
    height: 20,
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: theme.text01
  }
});

export default AnimatedSearchBar;