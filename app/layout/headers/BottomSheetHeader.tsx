import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../context';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';

const { FontWeights, FontSizes } = Typography;

interface BottomSheetHeaderProps {
  heading: string,
  subHeading: string
};

const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({ heading, subHeading }) => {
  const { theme } = useContext(AppContext);
  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).heading}>{heading}</Text>
      <Text style={styles(theme).subHeading}>{subHeading}</Text>
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {},
  heading: {
    ...FontWeights.Bold,
    ...FontSizes.Label,
    color: theme.text01
  },
  subHeading: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    marginTop: 2,
    color: theme.text02
  }
});

export default BottomSheetHeader;