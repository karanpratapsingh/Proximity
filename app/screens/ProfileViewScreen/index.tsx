import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ThemeContext } from '../../context/ThemeContext';
import { QUERY_USER } from '../../graphql/query';
import { GoBackHeader, ListEmptyComponent, ProfileScreenPlaceholder, PostThumbnail, ProfileCard } from '../../layout';
import { Typography } from '../../theme';
import { ThemeColors } from '../../types';
import UserInteractions from './components/UserInteractions';

const { IconSizes } = Typography;

const ProfileViewScreen: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const { data, loading, error } = useQuery(QUERY_USER, {
    variables: { userId: 'ck2ojhiw1002v0765ou6bdsl8' }, //doggo
    pollInterval: 1000
  });
 
  const targetId = 'ck2ojhiw1002v0765ou6bdsl8'; //@doggo

  let content = <ProfileScreenPlaceholder viewMode />;

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
            renderInteractions={() => <UserInteractions targetId={targetId} />}
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
  },
});

export default ProfileViewScreen;