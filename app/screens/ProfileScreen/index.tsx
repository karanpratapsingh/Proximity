import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Feather from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../../context/ThemeContext';
import { QUERY_USER } from '../../graphql/query';
import { Header, ListEmptyComponent } from '../../layout';
import { Typography } from '../../theme';
import { ThemeColors } from '../../types';
import PostThumbnail from './components/PostThumbnail';
import ProfileCard from './components/ProfileCard';

const { IconSizes } = Typography;

const ProfileScreen: React.FC = () => {

  const { data, loading } = useQuery(QUERY_USER, {
    variables: { userId: 'ck2oj3x2n001w0765e34k94w1' }
  });
  console.log(data);

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