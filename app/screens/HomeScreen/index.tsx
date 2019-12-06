import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from 'react-navigation-hooks';
import EmptyFeed from '../../../assets/svg/empty-feed.svg';
import { IconSizes, Routes } from '../../constants';
import { AppContext } from '../../context';
import { MUTATION_UPDATE_FCM_TOKEN } from '../../graphql/mutation';
import { Header, IconButton, PostCardPlaceholder, SvgBannerType } from '../../layout';
import { ThemeColors } from '../../types';
import { messaging, notifications } from '../../utils/firebase';
import PostCard from './components/PostCard';
import firebase from 'react-native-firebase';

const HomeScreen: React.FC = () => {

  const { user, theme } = useContext(AppContext);
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [updateFcmToken] = useMutation(MUTATION_UPDATE_FCM_TOKEN);

  const initializeFCM = async () => {
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
  };

  const dummyPost = {
    "id": "ck3ooh0mv01cm071409ltw0xk",
    "uri": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    "caption": "This post won't load, just a placeholder",
    "createdAt": "2019-11-27T14:58:01.133Z",
    "author": {
      "id": "ck2ojhiw1002v0765ou6bdsl8",
      "avatar": "https://animals.net/wp-content/uploads/2018/07/Pembroke-Welsh-Corgi-7-650x425.jpg",
      "handle": "@doggo"
    },
    "likes": []
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
      } catch (error) {
        alert(JSON.stringify(error));
      }
    });

    return () => {
      onTokenRefreshListener();
    };
  }, []);

  useEffect(() => {
    initializeFCM();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])

  const navigateToMessages = () => navigate(Routes.MessageScreen);

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

  if (!loading) {
    content = (
      <FlatGrid
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={[dummyPost]}
        ListEmptyComponent={() => <SvgBannerType Svg={EmptyFeed} topSpacing={responsiveHeight(20)} placeholder='Your feed is empty' />}
        style={styles().postList}
        spacing={20}
        renderItem={renderItem}
      />
    );
  }

  const IconRight = () => <IconButton
    Icon={() =>
      <FontAwesome
        name='send'
        size={IconSizes.x5}
        color={theme.text01}
      />}
    onPress={navigateToMessages}
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