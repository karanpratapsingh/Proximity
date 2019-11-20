import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LoadingIndicator from '../misc/LoadingIndicator';
import { ThemeStatic, Typography } from '../../theme';

const { FontWeights, FontSizes } = Typography;

interface ButtonType {
  label: string,
  onPress: any,
  loading: boolean,
  containerStyle?: any,
  labelStyle?: any
};

const Button: React.FC<ButtonType> = ({ label, onPress, loading, containerStyle, labelStyle }) => {

  let content = <LoadingIndicator size={8} color={ThemeStatic.white} />
  if (!loading) content = <Text style={[styles.label, labelStyle]}>{label}</Text>;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.container, containerStyle]}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 40,
    backgroundColor: ThemeStatic.accent
  },
  label: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: ThemeStatic.white
  }
});

export default Button;