import React, { useContext } from 'react';
import { StyleSheet, Image, View, Text, } from 'react-native';
import { AppContext } from '../../context';
import { Header, NativeImage } from '../../layout';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '../../constants';
import PostCard from './components/PostCard';
import { FlatGrid } from 'react-native-super-grid';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const { IconSizes } = Typography;

const HomeScreen: React.FC = () => {

  const { theme } = useContext(AppContext);
  const { navigate } = useNavigation();

  const navigateToMessages = () => navigate(Routes.MessageScreen);

  const renderItem = ({ item }) => <PostCard
    avatar='https://source.unsplash.com/random'
    name='Charlotte Jefferson'
    time='12 hrs ago'
    uri='https://source.unsplash.com/random'
    likes={12}
    caption='I look freakin awesome man'
  />;

  return (
    <View style={styles(theme).container}>
      <Header
        title='Home'
        IconRight={() => <FontAwesome onPress={navigateToMessages} name='send' size={IconSizes.x5} color={theme.text01} />}
      />
      <FlatGrid
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={[1, 2, 3]}
        // ListEmptyComponent={() => <ListEmptyComponent listType='messages' spacing={60} />}
        style={styles().postList}
        spacing={20}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  },
  postList: {
    flex: 1
  }
});

export default HomeScreen;