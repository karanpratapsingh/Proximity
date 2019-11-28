import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppContext } from '../../context';
import { Header } from '../../layout';
import { ThemeColors } from '../../types';
import UploadBanner from './components/UploadBanner';

const UploadScreen: React.FC = () => {

  const { theme } = useContext(AppContext);

  return (
    <View style={styles(theme).container}>
      <Header title='Upload' />
      <View style={styles().content}>
        <UploadBanner />
      </View>
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20
  }
});

export default UploadScreen;