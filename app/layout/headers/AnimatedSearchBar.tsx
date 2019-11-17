import React, { useContext, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Transition, Transitioning } from 'react-native-reanimated';
import { AppContext } from '../../context';
import { Typography } from '../../theme';
import { ThemeColors } from '../../types';

const { FontWeights, FontSizes } = Typography;

interface SearchBarType {
  value: string,
  onChangeText: any,
  onFocus?: any,
  onBlur?: any,
  placeholder: string,
  style?: object
};

const SearchBar: React.FC<SearchBarType> = ({ value, onChangeText, onFocus, onBlur, placeholder, style }) => {
  const { theme } = useContext(AppContext);
  // const [clock] = useState(new Clock());

  const transition = <Transition.Change interpolation='easeInOut' />;
  let [barWidth, setBarWidth] = useState(90);
  let [cancelWidth, setCancelWidth] = useState(0);
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

  return (
    <Transitioning.View
      style={styles().container}
      // @ts-ignore
      ref={transitionRef}
      transition={transition}>
      <TextInput
        autoCorrect={false}
        onFocus={onOpen}
        // onBlur={onBlur}
        style={[styles(theme).searchBar, { width: `${barWidth}%` }, style]}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        activeOpacity={0.90}
        onPress={onCancel}
        style={[styles().cancel, { width: cancelWidth }]}>
        <Text style={styles(theme).cancelText}>Cancel</Text>
      </TouchableOpacity>
    </Transitioning.View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  searchBar: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    marginLeft: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: theme.placeholder,
    color: theme.text02,
    borderRadius: 20,
    marginVertical: 5
  },
  cancel: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow'
  },
  cancelText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: theme.text01
  }
});

export default SearchBar;