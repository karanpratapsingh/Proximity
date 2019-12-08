import { useLazyQuery, useSubscription } from '@apollo/react-hooks';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useNavigationParam } from 'react-navigation-hooks';
import { Connections, IconSizes, PostDimensions } from '../../constants';
import { AppContext } from '../../context';
import { QUERY_USER } from '../../graphql/query';
import { ConnectionsBottomSheet, GoBackHeader, ListEmptyComponent, PostThumbnail, ProfileCard, ProfileScreenPlaceholder } from '../../layout';
import { ThemeColors } from '../../types/theme';
import UserInteractions from './components/UserInteractions';
import { SUBSCRIPTION_USER } from '../../graphql/subscription';

const ProfileViewScreen: React.FC = () => {
  const { theme } = useContext(AppContext);
  const userId = useNavigationParam('userId');

  const [userData, setUserData] = useState(null);

  const [queryUser, { data: userQueryData, called: userQueryCalled, loading: userQueryLoading, error: userQueryError }] = useLazyQuery(QUERY_USER, { variables: { userId } });

  const { data: userSubscriptionData, loading: userSubscriptionLoading } = useSubscription(SUBSCRIPTION_USER, { variables: { userId } });

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


  const followingBottomSheetRef = useRef();
  const followersBottomSheetRef = useRef();

  // @ts-ignore
  const onFollowingOpen = () => followingBottomSheetRef.current.open();
  // @ts-ignore
  const onFollowersOpen = () => followersBottomSheetRef.current.open();

  const ListHeaderComponent = () => {
    // @ts-ignore
    const { user: { avatar, following, followers, name, handle, about } } = userData;
    return (
      <ProfileCard
        avatar={avatar}
        onFollowingOpen={onFollowingOpen}
        onFollowersOpen={onFollowersOpen}
        following={following.length}
        followers={followers.length}
        name={name}
        handle={handle}
        renderInteractions={() => <UserInteractions targetId={userId} avatar={avatar} handle={handle} />}
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

  let content = <ProfileScreenPlaceholder viewMode />;

  if (userQueryCalled && !userQueryLoading && !userQueryError && userData) {
    // @ts-ignore
    const { user: { id, handle, posts } } = userData;
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
          userId={id}
          viewMode
          handle={handle}
          type={Connections.FOLLOWING}
        />
        <ConnectionsBottomSheet
          ref={followersBottomSheetRef}
          userId={id}
          viewMode
          handle={handle}
          type={Connections.FOLLOWERS}
        />
      </>
    );
  }

  return (
    <View style={styles(theme).container}>
      <GoBackHeader iconSize={IconSizes.x7} />
      {content}
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

export default ProfileViewScreen;