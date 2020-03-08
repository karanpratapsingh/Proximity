import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import EmptyLikesBanner from '@app/assets/svg/empty-likes.svg';
import { AppContext } from '@app/context';
import { QUERY_LIKE_USERS } from '@app/graphql/query';
import { BottomSheetHeader, ConnectionsPlaceholder, SvgBanner, UserCard } from '@app/layout';
import { ThemeColors } from '@app/types/theme';

interface LikesBottomSheetProps {
  ref: React.Ref<any>,
  likes: string[],
  onUserPress: (userId: string) => void
};

const LikesBottomSheet: React.FC<LikesBottomSheetProps> = React.forwardRef(({ likes, onUserPress }, ref) => {

  const { theme } = useContext(AppContext);

  const { data, loading, error } = useQuery(QUERY_LIKE_USERS, {
    variables: { likes },
    fetchPolicy: 'network-only'
  });

  let content = <ConnectionsPlaceholder />;

  const ListEmptyComponent = () => (
    <SvgBanner
      Svg={EmptyLikesBanner}
      placeholder='No likes yet'
      spacing={16}
    />
  );

  const renderItem = ({ item }) => {
    const { id, avatar, handle, name } = item;
    return (
      <UserCard
        userId={id}
        avatar={avatar}
        handle={handle}
        name={name}
        onPress={() => onUserPress(id)}
      />
    );
  };

  if (!loading && !error) {
    const { likeUsers } = data;

    content = (
      <FlatGrid
        bounces={false}
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={likeUsers}
        itemContainerStyle={styles().listItemContainer}
        contentContainerStyle={styles().listContentContainer}
        ListEmptyComponent={ListEmptyComponent}
        style={styles().listContainer}
        spacing={20}
        renderItem={renderItem}
      />
    );
  }

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles(theme).container}>
      <BottomSheetHeader
        heading='Likes'
        subHeading='Users who liked this post'
      />
      <View style={styles(theme).content}>
        {content}
      </View>
    </Modalize>
  );
});

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    backgroundColor: theme.base
  },
  content: {
    flex: 1,
    paddingBottom: responsiveHeight(5)
  },
  listContainer: {
    flex: 1
  },
  listItemContainer: {
    width: '106%'
  },
  listContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

export default LikesBottomSheet;