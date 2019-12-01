import React, { useContext } from 'react';
import { View, Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { AppContext } from '../../context';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';

const { FontWeights, FontSizes } = Typography;

interface SvgBannerType {
  Svg: any,
  placeholder: string,
  topSpacing?: number,
  textStyle?: StyleProp<TextStyle>
};

const SvgBanner: React.FC<SvgBannerType> = ({ Svg, placeholder, topSpacing, textStyle }) => {
  const { theme } = useContext(AppContext);

  return (
    <View style={[styles().container, { marginTop: topSpacing }]}>
      <Svg />
      <Text style={[styles(theme).placeholderText, textStyle]}>{placeholder}</Text>
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10
  },
  placeholderText: {
    ...FontWeights.Light,
    ...FontSizes.Label,
    color: theme.text02,
    marginTop: 40
  }
});

export default SvgBanner;