import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppContext } from '../../context';
import { Header, SearchBar } from '../../layout';
import { ThemeColors } from '../../types';
import { useLazyQuery } from '@apollo/react-hooks';
import { QUERY_SEARCH_USERS } from '../../graphql/query';
import UserCard from './components/UserCard';
import UserSearchResults from './components/UserSearchResults';

const ExploreScreen: React.FC = () => {

  const { theme } = useContext(AppContext);
  const [userSearch, setUserSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [querySearchUsers, {
    data: querySearchUsersData,
    loading: querySearchUsersLoading,
    called: querySearchUsersCalled,
    error: querySearchUsersError
  }] = useLazyQuery(QUERY_SEARCH_USERS);

  useEffect(() => {
    if (userSearch !== '') {
      querySearchUsers({ variables: { name: userSearch } });
    }
    if (querySearchUsersCalled && !querySearchUsersLoading) {
      const { searchUsers } = querySearchUsersData;
      setSearchResults(searchUsers);
    }

  }, [userSearch, querySearchUsersData, querySearchUsersCalled, querySearchUsersLoading]);

  const onFocus = () => setIsSearchFocused(true);
  const onBlur = () => setIsSearchFocused(false);

  let content = (
    <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>

    </View>
  );

  if (isSearchFocused) {
    let result = <Text>Banner</Text>;
    if (querySearchUsersCalled && querySearchUsersLoading) {
      result = <Text>Loading</Text>;
    } else if (!querySearchUsersLoading && userSearch === '') {
      result = <Text>Banner</Text>;
    } else if (querySearchUsersCalled && !querySearchUsersLoading && !querySearchUsersError) {
      result = <UserSearchResults searchResults={searchResults} />;
    }

    content = (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        {result}
      </View>
    );
  }

  return (
    <View style={styles(theme).container}>
      <Header title='Explore' />
      <SearchBar
        onFocus={onFocus}
        onBlur={onBlur}
        value={userSearch}
        onChangeText={setUserSearch}
        placeholder='Search for users...'
      />
      {content}
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