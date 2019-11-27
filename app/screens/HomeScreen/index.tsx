import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, } from 'react-native';
import { AppContext } from '../../context';
import { Header, NativeImage, ListEmptySvg, PostCardPlaceholder } from '../../layout';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '../../constants';
import PostCard from './components/PostCard';
import { FlatGrid } from 'react-native-super-grid';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import EmptyFeed from '../../../assets/svg/empty-feed.svg';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const { IconSizes } = Typography;

const HomeScreen: React.FC = () => {

  const { theme } = useContext(AppContext);
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])

  const navigateToMessages = () => navigate(Routes.MessageScreen);

  const renderItem = ({ item }) => <PostCard
    avatar='https://images.unsplash.com/photo-1574799643391-479f81bed030?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=774&q=80'
    name='Charlotte Jefferson'
    time='12 hrs ago'
    uri='https://source.unsplash.com/random'
    likes={12}
    caption='I look freakin awesome man'
  />;

  let content = <PostCardPlaceholder />;

  if (!loading) {
    content = (
      <FlatGrid
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={[1, 2, 4]}
        ListEmptyComponent={() => <ListEmptySvg Svg={EmptyFeed} topSpacing={responsiveHeight(20)} placeholder='your feed is empty' />}
        style={styles().postList}
        spacing={20}
        renderItem={renderItem}
      />
    );
  }

  return (
    <View style={styles(theme).container}>
      <Header
        title='Home'
        IconRight={() => <FontAwesome onPress={navigateToMessages} name='send' size={IconSizes.x5} color={theme.text01} />}
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
  postList: {
    flex: 1
  }
});

export default HomeScreen;