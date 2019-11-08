import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '../../theme';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeColors } from '../../types';

const { FontWeights, FontSizes, IconSizes } = Typography;

const ChatHeader = ({ handle }) => {

  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).label}>{handle}</Text>
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  label: {
    ...FontWeights.Bold,
    ...FontSizes.Heading,
    color: theme.text01
  }
});

export default ChatHeader;