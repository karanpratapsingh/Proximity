import { useLazyQuery } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchUsersBanner from '@app/assets/svg/search-users.svg';
import { AppContext } from '@app/context';
import { QUERY_POSTS, QUERY_SEARCH_USERS } from '@app/graphql/query';
import { AnimatedSearchBar, ExploreScreenPlaceholder, Header, SearchUsersPlaceholder, SvgBanner } from '@app/layout';
import { ThemeColors } from '@app/types/theme';
import ExploreGrid from './components/ExploreGrid';
import UserSearchResults from './components/UserSearchResults';

import posed, { Transition } from 'react-native-pose';

const FadeView = posed.View({
  enter: { opacity: 1 },
  exit: { opacity: 0.25 }
});

const ExploreScreen: React.FC = () => {

  const { user, theme } = useContext(AppContext);
  const [userSearch, setUserSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchUsersQuery, {
    data: searchUsersQueryData,
    loading: searchUsersQueryLoading,
    called: searchUsersQueryCalled,
    error: searchUsersQueryError
  }] = useLazyQuery(QUERY_SEARCH_USERS);
  const [queryPost, {
    data: postsQueryData,
    called: postsQueryCalled,
    loading: postsQueryLoading,
    error: postsQueryError,
    refetch: postsQueryRefetch
  }] = useLazyQuery(QUERY_POSTS, { variables: { userId: user.id }, fetchPolicy: 'network-only' });

  useEffect(() => {
    queryPost();
  }, []);

  useEffect(() => {
    if (userSearch !== '') searchUsersQuery({ variables: { userId: user.id, name: userSearch } });
    if (searchUsersQueryCalled && !searchUsersQueryLoading) {
      const { searchUsers } = searchUsersQueryData;
      setSearchResults(searchUsers);
    }
  }, [userSearch, searchUsersQueryData, searchUsersQueryCalled, searchUsersQueryLoading]);

  const onFocus = () => setIsSearchFocused(true);
  const onBlur = () => setIsSearchFocused(false);

  let content = <ExploreScreenPlaceholder />;

  const onRefresh = () => {
    try {
      postsQueryRefetch();
    } catch { }
  };

  if (postsQueryCalled && !postsQueryLoading && !postsQueryError) {
    const { posts } = postsQueryData;
    content = <ExploreGrid posts={posts} onRefresh={onRefresh} tintColor={theme.text02} />;
  }

  if (isSearchFocused) {
    let subContent;
    if (searchUsersQueryCalled && searchUsersQueryLoading) {
      subContent = <SearchUsersPlaceholder />;
    } else if (!searchUsersQueryLoading && userSearch === '') {
      subContent = <SvgBanner Svg={SearchUsersBanner} spacing={16} placeholder='Search for users...' />
    } else if (searchUsersQueryCalled && !searchUsersQueryLoading && !searchUsersQueryError) {
      subContent = <UserSearchResults searchResults={searchResults} />;
    }

    content = (
      <Transition animateOnMount>
        <FadeView style={styles().fadeView} key='search-content'>
          {subContent}
        </FadeView>
      </Transition>
    );
  }

  return (
    <View style={styles(theme).container}>
      <Header title='Explore' />
      <AnimatedSearchBar
        onFocus={onFocus}
        onBlur={onBlur}
        value={userSearch}
        onChangeText={setUserSearch}
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
    flex: 1
  },
  fadeView: {
    flex: 1
  }
});

export default ExploreScreen;