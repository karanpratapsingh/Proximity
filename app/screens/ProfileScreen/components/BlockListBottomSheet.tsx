import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useContext, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Modalize } from 'react-native-modalize';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import EmptyBlockListBanner from '@app/assets/svg/empty-blocklist.svg';
import { AppContext } from '@app/context';
import { MUTATION_UNBLOCK_USER } from '@app/graphql/mutation';
import { QUERY_BLOCKED_USERS } from '@app/graphql/query';
import { BottomSheetHeader, ConnectionsPlaceholder, DeleteCardRightActions, SvgBanner, UserCard } from '@app/layout';
import { ThemeColors } from '@app/types/theme';
import { longPressUnblockNotification } from '@app/utils/notifications';
import { PollIntervals } from '@app/constants';

interface BlockListBottomSheetProps {
  ref: React.Ref<any>,
  onUnblock: (userId: string) => void
};

const BlockListBottomSheet: React.FC<BlockListBottomSheetProps> = React.forwardRef(({ onUnblock }, ref) => {

  const { user, theme } = useContext(AppContext);

  const { data, loading, error } = useQuery(QUERY_BLOCKED_USERS, {
    variables: { userId: user.id },
    pollInterval: PollIntervals.blockList,
    fetchPolicy: 'network-only'
  });

  const [unblockUser, { loading: unblockUserLoading, called: unblockUserCalled }] = useMutation(MUTATION_UNBLOCK_USER);

  const swipeableRef = useRef();

  let content = <ConnectionsPlaceholder />;

  const ListEmptyComponent = () => (
    <SvgBanner
      Svg={EmptyBlockListBanner}
      placeholder='No users blocked'
      spacing={16}
    />
  );

  const onDelete = (blockedId: string, handle: string) => {
    if (!unblockUserLoading && !unblockUserCalled) {
      longPressUnblockNotification(() => {
        // @ts-ignore
        swipeableRef.current.close();
        unblockUser({ variables: { from: user.id, to: blockedId } });
      }, handle);
    }
  };

  const renderRightActions = (progress, dragX, blockedId: string, handle: string) => (
    <DeleteCardRightActions
      progress={progress}
      dragX={dragX}
      style={styles().rightActions}
      onDelete={() => onDelete(blockedId, handle)}
    />
  );

  const renderItem = ({ item }) => {
    const { id, avatar, handle, name } = item;
    return (
      <Swipeable
        // @ts-ignore
        ref={swipeableRef}
        useNativeAnimations
        rightThreshold={-300}
        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, id, handle)}>
        <UserCard
          userId={id}
          avatar={avatar}
          handle={handle}
          name={name}
          onPress={() => null}
        />
      </Swipeable>
    );
  };

  if (!loading && !error) {
    const { blockedUsers } = data;
    content = (
      <FlatGrid
        bounces={false}
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={blockedUsers}
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
        heading='Blocked Users'
        subHeading={`Below are the users you've blocked`}
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
  },
  rightActions: {
    marginRight: 20
  },
});

export default BlockListBottomSheet;