import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import { ListEmptyComponent } from '../../../layout';
import { UserCard } from '../../../layout';
import { AppContext } from '../../../context';

type SearchResult = {
  id: string,
  avatar: string,
  name: string,
  handle: string
};

interface UserSearchResultsProps {
  searchResults: SearchResult[]
};

const UserSearchResults: React.FC<UserSearchResultsProps> = ({ searchResults }) => {
  const { user } = useContext(AppContext);

  const filteredSearchResults = [...searchResults].filter(result => result.id !== user.id);

  const renderItem = ({ item }: { item: SearchResult }) => {
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

  return (
    <FlatGrid
      itemDimension={responsiveWidth(85)}
      showsVerticalScrollIndicator={false}
      items={filteredSearchResults}
      ListEmptyComponent={() => <ListEmptyComponent placeholder='No users found' spacing={60} />}
      style={styles.container}
      spacing={20}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsiveWidth(100)
  }
});

export default UserSearchResults;