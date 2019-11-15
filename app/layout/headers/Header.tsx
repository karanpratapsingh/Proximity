import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '../../theme';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeColors } from '../../types';

const { FontWeights, FontSizes, IconSizes } = Typography;

interface HeaderType {
  title: string,
  IconRight?: React.FC
};

const Header: React.FC<HeaderType> = ({ title, IconRight }) => {

  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles(theme).container}>
      <View>
        <Text style={styles(theme).label}>{title}</Text>
        {/* <View style={[styles(theme).underline, { width: title.length * 10 }]} /> */}
      </View>

      {IconRight && <IconRight />}
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingBottom: 10,
    paddingHorizontal: 24
  },
  label: {
    ...FontWeights.Bold,
    ...FontSizes.Heading,
    color: theme.text01
  },
  underline: {
    marginTop: 16,
    height: 2,
    width: 20,
    borderRadius: 10,
    backgroundColor: theme.text01
  }
});

export default Header;