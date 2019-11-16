import React, { useContext } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { AppContext } from '../../context';
import { Typography } from '../../theme';
import { ThemeColors } from '../../types';

const { FontWeights, FontSizes } = Typography;

interface SearchBarType {
  value: string,
  onChangeText: any,
  placeholder: string,
  style?: object
};

const SearchBar:React.FC<SearchBarType> = ({ value, onChangeText, placeholder, style }) => {
  const { theme } = useContext(AppContext);

  return (
    <TextInput
      style={[styles(theme).container, style]}
      value={value}
      placeholder={placeholder}
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
    borderRadius: 20,
    marginVertical: 5
  }
});

export default SearchBar;