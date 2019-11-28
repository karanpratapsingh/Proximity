import { useLazyQuery } from '@apollo/react-hooks';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import { AppContext } from '../../context';
import { QUERY_CHATS } from '../../graphql/query';
import { Header, ListEmptyComponent, MessageScreenPlaceholder, SearchBar } from '../../layout';
import { ThemeColors } from '../../types';
import MessageCard from './components/MessageCard';

const MessageScreen: React.FC = () => {

  const { user, theme } = useContext(AppContext);

  const [queryChats, { called, data, loading, error }] = useLazyQuery(QUERY_CHATS, {
    variables: { userId: user.id },
    fetchPolicy: 'network-only',
    pollInterval: 4000
  });
  const [chatSearch, setChatSearch] = useState('');

  useEffect(() => {
    queryChats();
  }, []);

  const renderItem = ({ item }) => {

    const { id, participants, messages } = item;
    const [participant] = participants.filter(({ id }) => user.id !== id);
    const [lastMessage] = messages;

    return (
      <MessageCard
        chatId={id}
        avatar={participant.avatar}
        handle={participant.handle}
        lastMessage={lastMessage.body}
        time={lastMessage.createdAt}
      />
    );
  };

  let content = <MessageScreenPlaceholder />;

  if (called && !loading && !error) {
    const { chats } = data;
    content = (
      <FlatGrid
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={chats}
        ListEmptyComponent={() => <ListEmptyComponent listType='messages' spacing={60} />}
        style={styles().messagesList}
        spacing={20}
        renderItem={renderItem}
      />
    );
  }

  return (
    <View style={styles(theme).container}>
      <Header title='Messages' />
      <SearchBar
        value={chatSearch}
        onChangeText={setChatSearch}
        placeholder='Search for chats...'
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
  messagesList: {
    flex: 1,
    paddingHorizontal: 4
  }
});

export default MessageScreen;