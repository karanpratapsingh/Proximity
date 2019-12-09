import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useContext, useEffect } from 'react';
import { Platform, StyleSheet, View, RefreshControl } from 'react-native';
import firebase from 'react-native-firebase';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from 'react-navigation-hooks';
import EmptyFeed from '../../../assets/svg/empty-feed.svg';
import { Errors, IconSizes, PollIntervals, Routes } from '../../constants';
import { AppContext } from '../../context';
import { MUTATION_UPDATE_FCM_TOKEN } from '../../graphql/mutation';
import { QUERY_USER_FEED } from '../../graphql/query';
import { Header, IconButton, PostCardPlaceholder, SvgBanner } from '../../layout';
import { ThemeColors } from '../../types/theme';
import { crashlytics, messaging, notifications } from '../../utils/firebase';
import PostCard from './components/PostCard';

const HomeScreen: React.FC = () => {

  const { user, theme } = useContext(AppContext);
  const { navigate } = useNavigation();
  const {
    data: userFeedQueryData,
    loading: userFeedQueryLoading,
    error: userFeedQueryError,
    refetch: userFeedRefetch
  } = useQuery(QUERY_USER_FEED, { variables: { userId: user.id }, fetchPolicy: 'network-only' });
  const [updateFcmToken] = useMutation(MUTATION_UPDATE_FCM_TOKEN);

  const initializeFCM = async () => {
    try {
      if (Platform.OS === 'android') {
        const channel = new firebase
          .notifications
          .Android
          .Channel('proximity-channel', 'Notification Channel', firebase.notifications.Android.Importance.Max)
          .setDescription('Proximity Notification Channel')
          .setSound('default');

        notifications.android.createChannel(channel);
      }
      const hasPermission = await messaging.hasPermission();
      if (!hasPermission) {
        await messaging.requestPermission();
      } else if (hasPermission) {
        const fcmToken = await messaging.getToken();
        updateFcmToken({
          variables: {
            userId: user.id,
            fcmToken
          }
        });
      }
    } catch ({ message }) {
      crashlytics.recordCustomError(Errors.INITIALIZE_FCM, message)
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
    initializeFCM();
  }, [])

  const navigateToMessages = () => navigate(Routes.MessageScreen);

  const refreshControl = () => (
    <RefreshControl
      refreshing={userFeedQueryLoading}
      onRefresh={userFeedRefetch}
    />
  );

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
        ListEmptyComponent={() => <SvgBanner Svg={EmptyFeed} spacing={20} placeholder={`Let's follow someone`} />}
        style={styles().postList}
        spacing={20}
        renderItem={renderItem}
      />
    );
  }

  const IconRight = () => <IconButton
    onPress={navigateToMessages}
    Icon={() =>
      <FontAwesome
        name='send'
        size={IconSizes.x5}
        color={theme.text01}
      />}
  />

  return (
    <View style={styles(theme).container}>
      <Header
        title='Home'
        IconRight={IconRight}
      />
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