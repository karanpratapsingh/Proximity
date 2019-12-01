import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Modalize from 'react-native-modalize';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import { BottomSheetHeader, ConnectionsPlaceholder } from '..';
import { ConnectionsType } from '../../constants';
import { AppContext } from '../../context';
import { QUERY_USER_CONNECTIONS } from '../../graphql/query';
import { ThemeColors } from '../../types';
import ListEmptyComponent from '../misc/ListEmptyComponent';
import UserCard from './UserCard';

interface ConnectionsBottomSheetProps {
  ref: React.Ref<any>,
  userId: string,
  type: string
};

const ConnectionsBottomSheet: React.FC<ConnectionsBottomSheetProps> = React.forwardRef(({ userId, type }, ref) => {

  const { theme } = useContext(AppContext);

  const { data, loading, error } = useQuery(QUERY_USER_CONNECTIONS, {
    variables: { userId, type }
  });

  let content = <ConnectionsPlaceholder />;
  let heading;
  let subHeading;

  if (type === ConnectionsType.FOLLOWING) {
    heading = 'Following';
    subHeading = 'People you follow'
  } else if (type === ConnectionsType.FOLLOWERS) {
    heading = 'Follower';
    subHeading = 'People following you'
  }

  const renderItem = ({ item }) => {
    const { id, avatar, handle, name } = item;
    return (
      <UserCard
        userId={id}
        avatar={avatar}
        handle={handle}
        name={name}
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
        ListEmptyComponent={() => <ListEmptyComponent placeholder='No users found' spacing={60} />}
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
        heading={heading}
        subHeading={subHeading}
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
    paddingTop: 20
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

export default ConnectionsBottomSheet;