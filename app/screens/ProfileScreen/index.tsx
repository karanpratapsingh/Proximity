import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Entypo from 'react-native-vector-icons/Entypo';
import { AppContext } from '../../context';
import { QUERY_USER } from '../../graphql/query';
import { Header, ListEmptyComponent, ProfileScreenPlaceholder, PostThumbnail, ProfileCard } from '../../layout';
import { Typography } from '../../theme';
import { ThemeColors } from '../../types';

const { IconSizes } = Typography;

const ProfileScreen: React.FC = () => {

  const { userId, theme } = useContext(AppContext);

  const { data, loading, error } = useQuery(QUERY_USER, {
    variables: { userId }
  });

  let content = <ProfileScreenPlaceholder />;

  if (!loading && !error) {
    const { user: { avatar, following, followers, name, handle, about, posts } } = data;
    content = (
      <FlatGrid
        ListHeaderComponent={() =>
          <ProfileCard
            avatar={avatar}
            following={following.length}
            followers={followers.length}
            name={name}
            handle={handle}
            about={about}
          />}
        itemDimension={150}
        items={posts}
        ListEmptyComponent={() => <ListEmptyComponent listType='posts' spacing={20} />}
        style={styles().postGrid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) =>
          <PostThumbnail
            id={null}
            uri='https://source.unsplash.com/random'
          />
        }
      />
    );
  }

  return (
    <View style={styles(theme).container}>
      <Header
        title='My Profile'
        IconRight={() => <Entypo name='dots-three-vertical' size={IconSizes.x5} color={theme.text01} />}
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
  postGrid: {
    flex: 1,
    marginHorizontal: 10
  },
});

export default ProfileScreen;