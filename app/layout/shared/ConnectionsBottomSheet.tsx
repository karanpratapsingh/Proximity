import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Modalize from 'react-native-modalize';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import { BottomSheetHeader, ConnectionsPlaceholder, SvgBanner } from '..';
import EmptyConnectionsBanner from '../../../assets/svg/empty-connections.svg';
import { Connections, PollIntervals } from '../../constants';
import { AppContext } from '../../context';
import { QUERY_USER_CONNECTIONS } from '../../graphql/query';
import { ThemeColors } from '../../types/theme';
import UserCard from './UserCard';

interface ConnectionsBottomSheetProps {
  ref: React.Ref<any>,
  viewMode?: boolean,
  userId: string,
  handle?: string,
  type: string
};

const ConnectionsBottomSheet: React.FC<ConnectionsBottomSheetProps> = React.forwardRef(({ viewMode, userId, handle, type }, ref) => {

  const { theme } = useContext(AppContext);

  const { data, loading, error } = useQuery(QUERY_USER_CONNECTIONS, {
    variables: { userId, type },
    pollInterval: PollIntervals.connections
  });

  let content = <ConnectionsPlaceholder />;
  let heading;
  let subHeading;

  if (type === Connections.FOLLOWING) {
    heading = 'Following';
    if (viewMode) {
      subHeading = `People ${handle} is following`;
    } else {
      subHeading = 'People you are following';
    }
  } else if (type === Connections.FOLLOWERS) {
    heading = 'Followers';
    if (viewMode) {
      subHeading = `People who are following ${handle}`;
    } else {
      subHeading = 'People who are following you';
    }
  }

  const ListEmptyComponent = () => (
    <SvgBanner
      Svg={EmptyConnectionsBanner}
      placeholder='No users found'
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
    flex: 1
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