import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { Header } from '../../layout';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '../../constants';

const { IconSizes } = Typography;

const HomeScreen: React.FC = () => {

  const { theme } = useContext(ThemeContext);
  const { navigate } = useNavigation();

  const navigateToMessages = () => navigate(Routes.MessageScreen);
  return (
    <View style={styles(theme).container}>
      <Header
        title='Home'
        IconRight={() => <FontAwesome onPress={navigateToMessages} name='send' size={IconSizes.x5} color={theme.text01} />}
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