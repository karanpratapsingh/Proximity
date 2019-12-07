import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import SearchUsersBanner from '../../../assets/svg/search-users.svg';
import { AppContext } from '../../context';
import { QUERY_POSTS, QUERY_SEARCH_USERS } from '../../graphql/query';
import { AnimatedSearchBar, ExploreScreenPlaceholder, Header, SearchUsersPlaceholder, SvgBannerType } from '../../layout';
import { ThemeColors } from '../../types/theme';
import ExploreGrid from './components/ExploreGrid';
import UserSearchResults from './components/UserSearchResults';
import { PollIntervals } from '../../constants';

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
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError
  } = useQuery(QUERY_POSTS, {
    pollInterval: PollIntervals.explore
  });

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

  if (!postsLoading && !postsError) {
    const { posts } = postsData;
    content = <ExploreGrid posts={posts} />;
  }

  if (isSearchFocused) {
    let subContent;
    if (querySearchUsersCalled && querySearchUsersLoading) {
      subContent = <SearchUsersPlaceholder />;
    } else if (!querySearchUsersLoading && userSearch === '') {
      subContent = <SvgBannerType Svg={SearchUsersBanner} topSpacing={responsiveHeight(16)} placeholder='Search users' />
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
  }
});

export default ExploreScreen;