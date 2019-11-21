import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import { AppContext } from '../../context';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';

const { FontWeights, FontSizes } = Typography;

interface FormInputType {
  label: string,
  value: string,
  onChangeText: any,
  multiline?: boolean,
  characterRestriction?: number,
  children?: any,
  error?: string
};

const FormInput: React.FC<FormInputType> = ({ label, value, onChangeText, children, multiline, characterRestriction, error }) => {
  const { theme } = useContext(AppContext);
  return (
    <TextField
      error={error}
      autoCorrect={false}
      tintColor={theme.accent}
      textColor={theme.text01}
      fontSize={FontSizes.Body.fontSize}
      labelFontSize={FontSizes.Body.fontSize}
      labelTextStyle={styles(theme).labelTextStyle}
      style={styles(theme).textStyle}
      lineWidth={0}
      activeLineWidth={0}
      label={label}
      onChangeText={onChangeText}
      value={value}
      multiline={multiline || false}
      characterRestriction={characterRestriction}
      renderRightAccessory={() => children}
    />
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  labelTextStyle: {
    ...FontWeights.Regular
  },
  textStyle: {
    ...FontWeights.Light
  }
});

export default FormInput;