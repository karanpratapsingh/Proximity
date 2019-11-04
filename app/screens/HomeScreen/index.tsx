import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { Header } from '../../layout';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { IconSizes } = Typography;

const HomeScreen: React.FC = () => {

  const { theme } = useContext(ThemeContext);
  
  return (
    <View style={styles(theme).container}>
      <Header
        title='Home'
        IconRight={() => <FontAwesome name='send' size={IconSizes.x6} color={theme.text01} />}
      />
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  }
});

export default HomeScreen;