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
        items={new Array(9).fill({})}
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