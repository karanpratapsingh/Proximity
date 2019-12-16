import { useQuery } from '@apollo/react-hooks';
import React, { useContext, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import { useNavigationParam } from 'react-navigation-hooks';
import { Connections, IconSizes, PollIntervals, PostDimensions } from '../../constants';
import { AppContext } from '../../context';
import { QUERY_USER } from '../../graphql/query';
import { ConnectionsBottomSheet, GoBackHeader, ListEmptyComponent, PostThumbnail, ProfileCard, ProfileScreenPlaceholder } from '../../layout';
import { ThemeColors } from '../../types/theme';
import UserInteractions from './components/UserInteractions';

const ProfileViewScreen: React.FC = () => {
  const { theme } = useContext(AppContext);
  const userId = useNavigationParam('userId');

  const { data, loading, error } = useQuery(QUERY_USER, {
    variables: { userId },
    pollInterval: PollIntervals.profileView,
    fetchPolicy: 'network-only'
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

  if (!loading && !error) {
    const { user: { handle, following, followers, posts } } = data;
    content = (
      <>
        <FlatGrid
          staticDimension={responsiveWidth(94)}
          ListHeaderComponent={ListHeaderComponent}
          itemDimension={150}
          items={posts}
          ListEmptyComponent={() => <ListEmptyComponent listType='posts' spacing={30} />}
          style={styles().postGrid}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
        <ConnectionsBottomSheet
          viewMode
          ref={followingBottomSheetRef}
          data={following}
          handle={handle}
          type={Connections.FOLLOWING}
        />
        <ConnectionsBottomSheet
          viewMode
          ref={followersBottomSheetRef}
          data={followers}
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
    marginHorizontal: 12
  }
});

export default ProfileViewScreen;