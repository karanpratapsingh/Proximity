import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const { FontWeights, FontSizes } = Typography;

const ListEmptyComponent = ({ listType, spacing }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles().container, { height: responsiveHeight(spacing) }]}>
      <Text style={styles(theme).emptyText}>No {listType} yet</Text>
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  emptyText: {
    ...FontWeights.Light,
    ...FontSizes.SubHeading,
    color: theme.text02
  }
});

export default ListEmptyComponent;