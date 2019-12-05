import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Modalize from 'react-native-modalize';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import { BottomSheetHeader, ConnectionsPlaceholder, SvgBannerType } from '..';
import EmptyConnectionsBanner from '../../../assets/svg/empty-connections.svg';
import { ConnectionsType } from '../../constants';
import { AppContext } from '../../context';
import { QUERY_USER_CONNECTIONS } from '../../graphql/query';
import { ThemeColors } from '../../types';
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
    pollInterval: 2000
  });

  let content = <ConnectionsPlaceholder />;
  let heading;
  let subHeading;

  if (type === ConnectionsType.FOLLOWING) {
    heading = 'Following';
    if (viewMode) {
      subHeading = `People ${handle} is following`;
    } else {
      subHeading = 'People you are following';
    }
  } else if (type === ConnectionsType.FOLLOWERS) {
    heading = 'Followers';
    if (viewMode) {
      subHeading = `People who are following ${handle}`;
    } else {
      subHeading = 'People who are following you';
    }
  }

  const ListEmptyComponent = () => (
    <SvgBannerType
      Svg={EmptyConnectionsBanner}
      placeholder='No users found'
      topSpacing={responsiveHeight(16)}
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