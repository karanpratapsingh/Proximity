import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import EmptyConnectionsBanner from '@app/../assets/svg/empty-connections.svg';

import { AppContext } from '@app/context';
import { BottomSheetHeader, SvgBanner, ConnectionsPlaceholder, UserCard } from '@app/layout';
import { ThemeColors } from '@app/types/theme';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER_CONNECTIONS } from '@app/graphql/query';
import { Connections } from '@app/constants';

interface NewMessageBottomSheetProps {
  ref: React.Ref<any>,
  onConnectionSelect: (targetId: string, avatar: string, handle: string) => void
};

const NewMessageBottomSheet: React.FC<NewMessageBottomSheetProps> = React.forwardRef(({ onConnectionSelect }, ref) => {

  const { user, theme } = useContext(AppContext);

  const { data, loading, error } = useQuery(QUERY_USER_CONNECTIONS, {
    variables: { userId: user.id, type: Connections.FOLLOWING },
    fetchPolicy: 'network-only'
  });

  let content = <ConnectionsPlaceholder />;

  const ListEmptyComponent = () => (
    <SvgBanner
      Svg={EmptyConnectionsBanner}
      placeholder={`You're not following anyone`}
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
        onPress={() => onConnectionSelect(id, avatar, handle)}
      />
    );
  };

  if (!loading && !error) {
    const { userConnections } = data;
    content = (
      <FlatGrid
        bounces={false}
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={userConnections}
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
        heading={`Let's talk`}
        subHeading='Connect with your friends'
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

export default NewMessageBottomSheet;