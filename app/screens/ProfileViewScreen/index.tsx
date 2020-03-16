import { useQuery, useMutation } from '@apollo/react-hooks';
import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { Connections, IconSizes, PollIntervals, PostDimensions } from '@app/constants';
import { AppContext } from '@app/context';
import { QUERY_USER } from '@app/graphql/query';
import { ConfirmationModal, ConnectionsBottomSheet, GoBackHeader, IconButton, ListEmptyComponent, PostThumbnail, ProfileCard, ProfileScreenPlaceholder } from '@app/layout';
import { ThemeStatic } from '@app/theme';
import { ThemeColors } from '@app/types/theme';
import { userBlockedNotification } from '@app/utils/notifications';
import { sortPostsAscendingTime } from '@app/utils/shared';
import ProfileOptionsBottomSheet from './components/ProfileOptionsBottomSheet';
import UserInteractions from './components/UserInteractions';
import { MUTATION_BLOCK_USER } from '@app/graphql/mutation';

const ProfileViewScreen: React.FC = () => {
  const { user, theme } = useContext(AppContext);
  const { goBack } = useNavigation();

  const userId = useNavigationParam('userId');

  const [blockConfirmationModal, setBlockConfirmationModal] = useState(false);

  const { data, loading, error } = useQuery(QUERY_USER, {
    variables: { userId },
    pollInterval: PollIntervals.profileView,
    fetchPolicy: 'network-only'
  });

  const [blockUser] = useMutation(MUTATION_BLOCK_USER);

  const followingBottomSheetRef = useRef();
  const followersBottomSheetRef = useRef();
  const profileOptionsBottomSheetRef = useRef();

  // @ts-ignore
  const onFollowingOpen = () => followingBottomSheetRef.current.open();
  // @ts-ignore
  const onFollowersOpen = () => followersBottomSheetRef.current.open();
  // @ts-ignore
  const onProfileOptionsOpen = () => profileOptionsBottomSheetRef.current.open();
  // @ts-ignore
  const onProfileOptionsClose = () => profileOptionsBottomSheetRef.current.close();

  const toggleBlockConfirmationModal = () => setBlockConfirmationModal(!blockConfirmationModal);

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
    const sortedPosts = sortPostsAscendingTime(posts);

    content = (
      <>
        <FlatGrid
          staticDimension={responsiveWidth(94)}
          ListHeaderComponent={ListHeaderComponent}
          itemDimension={150}
          items={sortedPosts}
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

  const onBlockUser = () => {
    onProfileOptionsClose();
    toggleBlockConfirmationModal();
  };

  const processBlockUser = async () => {
    const { user: { handle } } = data;

    toggleBlockConfirmationModal();
    await blockUser({ variables: { from: user.id, to: userId } });
    goBack();
    userBlockedNotification(handle)
  };

  const IconRight = () => <IconButton
    onPress={onProfileOptionsOpen}
    style={styles().profileOptions}
    Icon={() => <Entypo
      name='dots-three-vertical'
      size={IconSizes.x5}
      color={theme.text01}
    />}
  />;

  return (
    <View style={styles(theme).container}>
      <GoBackHeader iconSize={IconSizes.x7} IconRight={IconRight} />
      {content}
      <ProfileOptionsBottomSheet ref={profileOptionsBottomSheetRef} onBlockUser={onBlockUser} />
      <ConfirmationModal
        label='Confirm'
        title='Block'
        description='Are you sure you want to block this user?'
        color={ThemeStatic.delete}
        isVisible={blockConfirmationModal}
        toggle={toggleBlockConfirmationModal}
        onConfirm={processBlockUser}
      />
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
  },
  profileOptions: {
    flex: 1,
    alignItems: 'flex-end'
  }
});

export default ProfileViewScreen;