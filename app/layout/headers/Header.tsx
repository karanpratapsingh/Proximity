import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '../../theme';
import { AppContext } from '../../context';
import { ThemeColors } from '../../types';

const { FontWeights, FontSizes } = Typography;

interface HeaderProps {
  title: string,
  IconRight?: React.FC
};

const Header: React.FC<HeaderProps> = ({ title, IconRight }) => {

  const { theme } = useContext(AppContext);
  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).title}>{title}</Text>
      {IconRight && <IconRight />}
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 20
  },
  title: {
    ...FontWeights.Bold,
    ...FontSizes.Heading,
    color: theme.text01
  }
});

export default Header;