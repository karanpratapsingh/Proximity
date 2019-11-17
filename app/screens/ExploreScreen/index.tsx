import { useLazyQuery } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppContext } from '../../context';
import { QUERY_SEARCH_USERS } from '../../graphql/query';
import { ExploreScreenPlaceholder, Header, AnimatedSearchBar, SearchUsersPlaceholder } from '../../layout';
import { ThemeColors } from '../../types';
import UserSearchResults from './components/UserSearchResults';
import SearchUsersBanner from '../../../assets/svg/search-users.svg';

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
    if (userSearch !== '') querySearchUsers({ variables: { name: userSearch } });
    if (querySearchUsersCalled && !querySearchUsersLoading) {
      const { searchUsers } = querySearchUsersData;
      setSearchResults(searchUsers);
    }
  }, [userSearch, querySearchUsersData, querySearchUsersCalled, querySearchUsersLoading]);

  const onFocus = () => setIsSearchFocused(true);
  const onBlur = () => setIsSearchFocused(false);

  let content = <ExploreScreenPlaceholder />;

  if (isSearchFocused) {
    let subContent;
    if (querySearchUsersCalled && querySearchUsersLoading) {
      subContent = <SearchUsersPlaceholder />;
    } else if (!querySearchUsersLoading && userSearch === '') {
      subContent = <SearchUsersBanner />;
    } else if (querySearchUsersCalled && !querySearchUsersLoading && !querySearchUsersError) {
      subContent = <UserSearchResults searchResults={searchResults} />;
    }

    content = (
      <>
        {subContent}
      </>
    );
  }

  return (
    <View style={styles(theme).container}>
      <Header title='Explore' />
      <AnimatedSearchBar
        onFocus={onFocus}
        onBlur={onBlur}
        value={userSearch}
        onChangeText={searchText => setUserSearch(searchText.toLowerCase())}
        placeholder='Search for users...'
      />
      <View style={styles().content}>
        {content}
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
    justifyContent: 'center'
  }
});

export default ExploreScreen;