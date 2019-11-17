import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../context';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const { FontWeights, FontSizes } = Typography;

interface ListEmptyComponentType {
  listType?: string,
  spacing: number,
  placeholder?: string
};

const ListEmptyComponent: React.FC<ListEmptyComponentType> = ({ listType, spacing, placeholder }) => {
  const { theme } = useContext(AppContext);
  let content = `No ${listType} yet`;
  if (placeholder) {
    content = placeholder;
  }

  return (
    <View style={[styles().container, { height: responsiveHeight(spacing) }]}>
      <Text style={styles(theme).emptyText}>{content}</Text>
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