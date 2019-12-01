import { useQuery } from '@apollo/react-hooks';
import React, { useContext, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useNavigationParam } from 'react-navigation-hooks';
import { IconSizes, PostDimensions } from '../../constants';
import { AppContext } from '../../context';
import { QUERY_USER } from '../../graphql/query';
import { GoBackHeader, ListEmptyComponent, PostThumbnail, ProfileCard, ProfileScreenPlaceholder } from '../../layout';
import { ThemeColors } from '../../types';
import UserInteractions from './components/UserInteractions';
import ConnectionsBottomSheet from '../ProfileScreen/components/ConnectionsBottomSheet';

const ProfileViewScreen: React.FC = () => {
  const { theme } = useContext(AppContext);
  const userId = useNavigationParam('userId');

  const { data, loading, error } = useQuery(QUERY_USER, {
    variables: { userId },
    pollInterval: 1000
  });

  const followingBottomSheetRef = useRef();
  const followersBottomSheetRef = useRef();

  // @ts-ignore
  const onFollowingOpen = () => followingBottomSheetRef.current.open();
  // @ts-ignore
  const onFollowersOpen = () => followersBottomSheetRef.current.open();

  const ListHeaderComponent = () => {
    const { user: { avatar, following, followers, name, handle, about } } = data;
    return (
      <ProfileCard
        avatar={avatar}
        onFollowingOpen={onFollowingOpen}
        onFollowersOpen={onFollowersOpen}
        following={following.length}
        followers={followers.length}
        name={name}
        handle={handle}
        renderInteractions={() => <UserInteractions targetId={userId} handle={handle} />}
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

  if (!loading && !error) {
    const { user: { posts } } = data;
    content = (
      <>
        <FlatGrid
          ListHeaderComponent={ListHeaderComponent}
          itemDimension={150}
          items={posts}
          ListEmptyComponent={() => <ListEmptyComponent listType='posts' spacing={20} />}
          style={styles().postGrid}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
        <ConnectionsBottomSheet
          ref={followingBottomSheetRef}
          userId={'user.id'}
          type='Following'
        />
        <ConnectionsBottomSheet
          ref={followersBottomSheetRef}
          userId={'user.id'}
          type='Followers'
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