import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useContext, useEffect } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from 'react-navigation-hooks';
import EmptyFeed from '@app/assets/svg/empty-feed.svg';
import { Errors, IconSizes, Routes } from '@app/constants';
import { AppContext } from '@app/context';
import { MUTATION_UPDATE_FCM_TOKEN } from '@app/graphql/mutation';
import { QUERY_USER_FEED } from '@app/graphql/query';
import { HomeHeader, IconButton, PostCardPlaceholder, SvgBanner } from '@app/layout';
import { ThemeColors } from '@app/types/theme';
import { crashlytics, initializeFCM, messaging } from '@app/utils/firebase';
import PostCard from './components/PostCard';

const HomeScreen: React.FC = () => {

  const { user, theme, unreadMessages } = useContext(AppContext);
  const { navigate } = useNavigation();
  const {
    data: userFeedQueryData,
    loading: userFeedQueryLoading,
    error: userFeedQueryError,
    refetch: userFeedRefetch
  } = useQuery(QUERY_USER_FEED, { variables: { userId: user.id }, fetchPolicy: 'network-only' });
  const [updateFcmToken] = useMutation(MUTATION_UPDATE_FCM_TOKEN);

  const initialize = async () => {
    const fcmToken = await initializeFCM();
    if (fcmToken) {
      updateFcmToken({
        variables: {
          userId: user.id,
          fcmToken
        }
      });
    }
  };

  useEffect(() => {
    const onTokenRefreshListener = messaging.onTokenRefresh(fcmToken => {
      try {
        if (fcmToken) updateFcmToken({
          variables: {
            userId: user.id,
            fcmToken
          }
        });
      } catch ({ message }) {
        crashlytics.recordCustomError(Errors.UPDATE_FCM_TOKEN, message)
      }
    });

    return () => {
      onTokenRefreshListener();
    };
  }, []);

  useEffect(() => {
    initialize();
  }, [])

  const navigateToMessages = () => navigate(Routes.MessageScreen);

  const refreshControl = () => {
    const onRefresh = () => {
      try {
        userFeedRefetch();
      } catch { }
    };

    return (
      <RefreshControl
        tintColor={theme.text02}
        refreshing={userFeedQueryLoading}
        onRefresh={onRefresh}
      />
    );
  };

  const renderItem = ({ item }) => {

    const { id, uri, caption, likes, createdAt, author } = item;

    return <PostCard
      id={id}
      author={author}
      time={createdAt}
      uri={uri}
      likes={likes}
      caption={caption}
    />;
  };

  let content = <PostCardPlaceholder />;

  if (!userFeedQueryLoading && !userFeedQueryError) {
    const { userFeed } = userFeedQueryData;
    content = (
      <FlatGrid
        refreshControl={refreshControl()}
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={userFeed}
        ListEmptyComponent={() => <SvgBanner Svg={EmptyFeed} spacing={20} placeholder={'No new posts'} />}
        style={styles().postList}
        spacing={20}
        renderItem={renderItem}
      />
    );
  }

  const IconRight = () => {
    const hasBadge = unreadMessages !== 0;
    return <IconButton
      hasBadge={hasBadge}
      badgeCount={unreadMessages}
      onPress={navigateToMessages}
      Icon={() =>
        <FontAwesome
          name='send'
          size={IconSizes.x5}
          color={theme.text01}
        />}
    />;
  };

  return (
    <View style={styles(theme).container}>
      <HomeHeader IconRight={IconRight} />
      {content}
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  },
  postList: {
    flex: 1
  }
});

export default HomeScreen;