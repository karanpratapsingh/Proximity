import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppContext } from '../../context';
import { Header, SearchBar } from '../../layout';
import { ThemeColors } from '../../types';

const ExploreScreen: React.FC = () => {

  const { theme } = useContext(AppContext);
  const [userSearch, setUserSearch] = useState('');

  return (
    <View style={styles(theme).container}>
      <Header title='Explore' />
      <SearchBar
        value={userSearch}
        onChangeText={setUserSearch}
        placeholder='Search for users...'
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

export default ExploreScreen;