import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../context';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';

const { FontWeights, FontSizes } = Typography;

interface ListEmptySvgType {
  Svg: any,
  placeholder: string,
  topSpacing?: number
};

const ListEmptySvg: React.FC<ListEmptySvgType> = ({ Svg, placeholder, topSpacing }) => {
  const { theme } = useContext(AppContext);

  return (
    <View style={[styles().container, { marginTop: topSpacing }]}>
      <Svg />
      <Text style={styles(theme).placeholderText}>{placeholder}</Text>
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
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

export default ListEmptySvg;