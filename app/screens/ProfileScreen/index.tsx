import { useQuery } from '@apollo/react-hooks';
import React, { useContext, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Entypo from 'react-native-vector-icons/Entypo';
import { AppContext } from '../../context';
import { QUERY_USER } from '../../graphql/query';
import { Header, ListEmptyComponent, ProfileScreenPlaceholder, PostThumbnail, ProfileCard, IconButton } from '../../layout';
import { Typography } from '../../theme';
import { ThemeColors } from '../../types';

import EditProfileBottomSheet from './components/EditProfileBottomSheet';
import SettingsBottomSheet from './components/SettingsBottomSheet';
import { PostDimensions } from '../../constants';

const { IconSizes } = Typography;

const ProfileScreen: React.FC = () => {

  const { userId, theme } = useContext(AppContext);

  const { data, loading, error } = useQuery(QUERY_USER, {
    variables: { userId },
    pollInterval: 1000
  });

  const editProfileBottomSheetRef = useRef();
  const settingsBottomSheetRef = useRef();

  // @ts-ignore
  const onEdit = () => editProfileBottomSheetRef.current.open();
  // @ts-ignore
  const onSettings = () => settingsBottomSheetRef.current.open();

  const ListHeaderComponent = () => {
    const { user: { avatar, following, followers, name, handle, about } } = data;
    return (
      <ProfileCard
        editable
        onEdit={onEdit}
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

  if (!loading && !error) {
    const { user: { avatar, name, handle, about, posts } } = data;
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
      <SettingsBottomSheet ref={settingsBottomSheetRef} />
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