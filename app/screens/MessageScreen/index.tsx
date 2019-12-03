import { useLazyQuery } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import EmptyMessages from '../../../assets/svg/empty-messages.svg';
import { AppContext } from '../../context';
import { QUERY_CHATS } from '../../graphql/query';
import { Header, MessageScreenPlaceholder, SearchBar, SvgBannerType } from '../../layout';
import { ThemeColors } from '../../types';
import MessageCard from './components/MessageCard';
import { filterChatParticipants } from '../../utils/shared';

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
    const [participant] = filterChatParticipants(user.id, participants);
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
    const filteredChats = chats.filter(({ participants }) => {
      const [participant] = filterChatParticipants(user.id, participants);
      if (chatSearch === '') return true;
      return participant
        .handle
        .toLowerCase()
        .includes(chatSearch.toLocaleLowerCase());
    });

    content = (
      <FlatGrid
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={filteredChats}
        ListEmptyComponent={() => <SvgBannerType Svg={EmptyMessages} topSpacing={responsiveHeight(16)} placeholder='No messages' />}
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