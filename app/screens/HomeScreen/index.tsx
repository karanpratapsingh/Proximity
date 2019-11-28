import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from 'react-navigation-hooks';
import EmptyFeed from '../../../assets/svg/empty-feed.svg';
import { IconSizes, Routes } from '../../constants';
import { AppContext } from '../../context';
import { Header, IconButton, ListEmptySvg, PostCardPlaceholder } from '../../layout';
import { ThemeColors } from '../../types';
import PostCard from './components/PostCard';

const HomeScreen: React.FC = () => {

  const { theme } = useContext(AppContext);
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);

  const dummyPost = {
    "id": "ck3hf3vza001g0774mbx0929j",
    "uri": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    "caption": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    "createdAt": "2019-11-27T14:58:01.133Z",
    "author": {
      "id": "ck2ojhiw1002v0765ou6bdsl8",
      "avatar": "https://animals.net/wp-content/uploads/2018/07/Pembroke-Welsh-Corgi-7-650x425.jpg",
      "handle": "@doggo"
    },
    "likes": 12
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])

  const navigateToMessages = () => navigate(Routes.MessageScreen);

  const renderItem = ({ item }) => {

    const { id, uri, caption, likes, createdAt, author } = item;

    return <PostCard
      id={id}
      author={author}
      time={createdAt}
      uri={uri}
      likes={likes}
      caption={caption}
    />;
  };

  let content = <PostCardPlaceholder />;

  if (!loading) {
    content = (
      <FlatGrid
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={[dummyPost]}
        ListEmptyComponent={() => <ListEmptySvg Svg={EmptyFeed} topSpacing={responsiveHeight(20)} placeholder='your feed is empty' />}
        style={styles().postList}
        spacing={20}
        renderItem={renderItem}
      />
    );
  }

  const IconRight = () => <IconButton
    Icon={() =>
      <FontAwesome
        name='send'
        size={IconSizes.x5}
        color={theme.text01}
      />}
    onPress={navigateToMessages}
  />

  return (
    <View style={styles(theme).container}>
      <Header
        title='Home'
        IconRight={IconRight}
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