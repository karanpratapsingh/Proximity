import React from 'react';
import { StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import { ListEmptyComponent } from '../../../layout';
import UserCard from './UserCard';

interface UserSearchResultsType {
  searchResults: any[]
};

const UserSearchResults: React.FC<UserSearchResultsType> = ({ searchResults }) => (
  <FlatGrid
    itemDimension={responsiveWidth(85)}
    showsVerticalScrollIndicator={false}
    items={searchResults}
    ListEmptyComponent={() => <ListEmptyComponent placeholder='No users found' spacing={60} />}
    style={styles.container}
    spacing={20}
    renderItem={({ item }) => {

      const { id, avatar, handle, name } = item;

      return (
        <UserCard
          userId={id}
          avatar={avatar}
          handle={handle}
          name={name}
        />
      );
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsiveWidth(100)
  }
});

export default UserSearchResults;