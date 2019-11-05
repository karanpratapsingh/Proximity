import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { Header, ListEmptyComponent } from '../../layout';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
import ProfileCard from './components/ProfileCard';
import { FlatGrid } from 'react-native-super-grid';
import PostThumbnail from './components/PostThumbnail';

const { IconSizes } = Typography;

const ProfileScreen: React.FC = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <Header
        title='My Profile'
        IconRight={() => <Feather name='settings' size={IconSizes.x7} color={theme.text01} />}
      />

      <FlatGrid
        ListHeaderComponent={() => <ProfileCard />}
        itemDimension={150}
        items={new Array(2).fill({})}
        ListEmptyComponent={() => <ListEmptyComponent listType='posts' />}
        style={styles().postGrid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) =>
          <PostThumbnail
            id={null}
            uri='https://images.unsplash.com/photo-1445358952072-12e33523825c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1600'
          />
        }
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
});

export default ProfileScreen;