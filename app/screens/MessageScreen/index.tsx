import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import EmptyMessages from '@app/assets/svg/empty-messages.svg';
import { PollIntervals, IconSizes, Routes, Errors } from '@app/constants';
import { AppContext } from '@app/context';
import { QUERY_CHATS, QUERY_CHAT_EXISTS } from '@app/graphql/query';
import { Header, MessageScreenPlaceholder, SearchBar, SvgBanner, IconButton } from '@app/layout';
import { ThemeColors } from '@app/types/theme';
import { filterChatParticipants, isUserOnline, searchQueryFilter, sortMessageAscendingTime } from '@app/utils/shared';
import MessageCard from './components/MessageCard';
import NewMessageBottomSheet from './components/NewMessageBottomSheet';

import Entypo from 'react-native-vector-icons/Entypo';
import client from '@app/graphql/client';
import { MUTATION_CREATE_TEMPORARY_CHAT } from '@app/graphql/mutation';
import { useNavigation } from 'react-navigation-hooks';
import { crashlytics } from '@app/utils/firebase';
import { tryAgainLaterNotification } from '@app/utils/notifications';

const MessageScreen: React.FC = () => {

  const { navigate } = useNavigation();
  const { user, theme } = useContext(AppContext);

  const [queryChats, { called, data, loading, error }] = useLazyQuery(QUERY_CHATS, {
    variables: { userId: user.id },
    fetchPolicy: 'network-only',
    pollInterval: PollIntervals.messages
  });

  const [createTemporaryChat] = useMutation(MUTATION_CREATE_TEMPORARY_CHAT);

  const [chatSearch, setChatSearch] = useState('');
  const newMessageBottomSheetRef = useRef();

  useEffect(() => {
    queryChats();
  }, []);

  const renderItem = ({ item }) => {

    const { id: chatId, participants, messages } = item;
    const [participant] = filterChatParticipants(user.id, participants);
    const [lastMessage] = messages;

    const { id, avatar, handle, lastSeen } = participant;
    const {
      id: messageId,
      author: { id: authorId },
      seen,
      body: messageBody,
      createdAt: time
    } = lastMessage;

    const isOnline = isUserOnline(lastSeen);

    return (
      <MessageCard
        chatId={chatId}
        participantId={id}
        avatar={avatar}
        handle={handle}
        authorId={authorId}
        messageId={messageId}
        messageBody={messageBody}
        seen={seen}
        time={time}
        isOnline={isOnline}
      />
    );
  };

  let content = <MessageScreenPlaceholder />;

  if (called && !loading && !error) {
    const { chats } = data;

    const filteredChats = searchQueryFilter(chats, user.id, chatSearch);
    const sortedFilteredChats = sortMessageAscendingTime(filteredChats);

    content = (
      <FlatGrid
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={sortedFilteredChats}
        ListEmptyComponent={() => <SvgBanner Svg={EmptyMessages} spacing={16} placeholder='No messages' />}
        style={styles().messagesList}
        spacing={20}
        renderItem={renderItem}
      />
    );
  }

  const onConnectionSelect = async (targetId: string, avatar: string, handle: string) => {
    try {
      const { data: { chatExists } } = await client.query({
        query: QUERY_CHAT_EXISTS,
        variables: { userId: user.id, targetId },
        fetchPolicy: 'no-cache'
      });

      // @ts-ignore
      newMessageBottomSheetRef.current.close();
      if (chatExists) {
        navigate(Routes.ConversationScreen, { chatId: chatExists.id, avatar, handle, targetId });
      } else {
        const { data } = await createTemporaryChat();
        navigate(Routes.ConversationScreen, { chatId: data.createTemporaryChat.id, avatar, handle, targetId });
      }
    } catch ({ message }) {
      tryAgainLaterNotification();
      crashlytics.recordCustomError(Errors.INITIALIZE_CHAT, message);
    }
  };

  const IconRight = () => <IconButton
    // @ts-ignore
    onPress={() => newMessageBottomSheetRef.current.open()}
    Icon={() =>
      <Entypo
        name='add-to-list'
        size={IconSizes.x6}
        color={theme.text01}
      />}
  />

  return (
    <View style={styles(theme).container}>
      <Header
        title='Messages'
        IconRight={IconRight}
      />
      <SearchBar
        value={chatSearch}
        onChangeText={setChatSearch}
        placeholder='Search for chats...'
      />
      {content}
      <NewMessageBottomSheet
        ref={newMessageBottomSheetRef}
        onConnectionSelect={onConnectionSelect}
      />
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