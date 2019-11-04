import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialColors, Typography } from '../../theme';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeColors } from '../../types';

const { FontWeights, FontSizes } = Typography;

const ProfileScreen: React.FC = () => {

  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles(theme).container}>

    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  }
});

export default ProfileScreen;