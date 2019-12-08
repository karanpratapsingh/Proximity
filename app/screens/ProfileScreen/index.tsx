import { useQuery, useSubscription, useLazyQuery } from '@apollo/react-hooks';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Entypo from 'react-native-vector-icons/Entypo';
import { IconSizes, PostDimensions, Connections, PollIntervals } from '../../constants';
import { AppContext } from '../../context';
import { QUERY_USER } from '../../graphql/query';
import { Header, IconButton, ListEmptyComponent, PostThumbnail, ProfileCard, ConnectionsBottomSheet, ProfileScreenPlaceholder } from '../../layout';
import { ThemeColors } from '../../types/theme';
import EditProfileBottomSheet from './components/EditProfileBottomSheet';
import SettingsBottomSheet from './components/SettingsBottomSheet';
import AboutBottomSheet from './components/AboutBottomSheet';
import { SUBSCRIPTION_USER } from '../../graphql/subscription';

const ProfileScreen: React.FC = () => {

  const { user, theme } = useContext(AppContext);
  const [userData, setUserData] = useState(null);

  const [queryUser, { data: userQueryData, called: userQueryCalled, loading: userQueryLoading, error: userQueryError }] = useLazyQuery(QUERY_USER, { variables: { userId: user.id } });

  const { data: userSubscriptionData, loading: userSubscriptionLoading } = useSubscription(SUBSCRIPTION_USER, { variables: { userId: user.id } });

  useEffect(() => {
    if (!userSubscriptionLoading) {
      setUserData(userSubscriptionData);
    } else if (userSubscriptionLoading) {
      if (userQueryCalled && !userQueryLoading) {
        setUserData(userQueryData);
      } else if (!userQueryCalled) {
        queryUser();
      }
    }
  }, [userQueryData, userQueryCalled, userQueryLoading, userSubscriptionData, userSubscriptionLoading]);


  const editProfileBottomSheetRef = useRef();
  const settingsBottomSheetRef = useRef();
  const followingBottomSheetRef = useRef();
  const followersBottomSheetRef = useRef();
  const aboutBottomSheetRef = useRef();

  // @ts-ignore
  const onFollowingOpen = () => followingBottomSheetRef.current.open();
  // @ts-ignore
  const onFollowersOpen = () => followersBottomSheetRef.current.open();
  // @ts-ignore
  const onEdit = () => editProfileBottomSheetRef.current.open();
  // @ts-ignore
  const onSettings = () => settingsBottomSheetRef.current.open();

  const onAbout = () => {
    // @ts-ignore
    settingsBottomSheetRef.current.close()
    // @ts-ignore
    aboutBottomSheetRef.current.open();
  };

  const ListHeaderComponent = () => {
    // @ts-ignore
    const { user: { avatar, following, followers, name, handle, about } } = userData;
    return (
      <ProfileCard
        editable
        onEdit={onEdit}
        onFollowingOpen={onFollowingOpen}
        onFollowersOpen={onFollowersOpen}
        avatar={avatar}
        following={following.length}
        followers={followers.length}
        name={name}
        handle={handle}
        about={about}
      />
    );
  };

  const renderItem = ({ item }) => {
    const { id, uri } = item;
    return (
      <PostThumbnail
        id={id}
        uri={uri}
        dimensions={PostDimensions.Medium}
      />
    );
  };

  let content = <ProfileScreenPlaceholder />;

  if (userQueryCalled && !userQueryLoading && !userQueryError && userData) {
    // @ts-ignore
    const { user: { avatar, name, handle, about, posts } } = userData;
    content = (
      <>
        <FlatGrid
          ListHeaderComponent={ListHeaderComponent}
          itemDimension={150}
          items={posts}
          ListEmptyComponent={() => <ListEmptyComponent listType='posts' spacing={30} />}
          style={styles().postGrid}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
        <ConnectionsBottomSheet
          ref={followingBottomSheetRef}
          userId={user.id}
          type={Connections.FOLLOWING}
        />
        <ConnectionsBottomSheet
          ref={followersBottomSheetRef}
          userId={user.id}
          type={Connections.FOLLOWERS}
        />
        <EditProfileBottomSheet
          ref={editProfileBottomSheetRef}
          avatar={avatar}
          name={name}
          handle={handle}
          about={about}
        />
      </>
    );
  }

  const IconRight = () => <IconButton
    onPress={onSettings}
    Icon={() => <Entypo
      name='dots-three-vertical'
      size={IconSizes.x5}
      color={theme.text01}
    />}
  />;

  return (
    <View style={styles(theme).container}>
      <Header
        title='My Profile'
        IconRight={IconRight}
      />
      {content}
      <AboutBottomSheet ref={aboutBottomSheetRef} />
      <SettingsBottomSheet ref={settingsBottomSheetRef} onAboutPress={onAbout} />
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  },
  postGrid: {
    flex: 1,
    marginHorizontal: 10
  }
});

export default ProfileScreen;