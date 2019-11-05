import React, { useContext } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { Typography } from '../../theme';
import { ThemeColors } from '../../types';

const { FontWeights, FontSizes } = Typography;

const SearchBar = ({ value, onChangeText, style }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <TextInput
      style={[styles(theme).container, style]}
      value={value}
      placeholder={'Search for chats...'}
      onChangeText={onChangeText}
    />
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: theme.placeholder,
    color: theme.text02,
    borderRadius: 20
  }
});

export default SearchBar;