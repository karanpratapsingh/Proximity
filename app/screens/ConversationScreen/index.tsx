import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';
import { GiftedChat, MessageText } from 'react-native-gifted-chat';
import { useQuery, useMutation, useSubscription, useLazyQuery } from '@apollo/react-hooks';
import { QUERY_CHAT } from '../../graphql/query';
import { SUBSCRIPTION_CHAT } from '../../graphql/subscription';
import { MUTATION_ADD_MESSAGE } from '../../graphql/mutation';
import { ConversationScreenPlaceholder } from '../../layout';
import CustomMessageText from './components/CustomMessageText';
import CustomSend from './components/CustomSend';

const userId = 'ck2oj3x2n001w0765e34k94w1';

const ConversationScreen = () => {
  const chatId = useNavigationParam('chatId');
  const [messages, setMessages] = useState([]);
  const [queryChat, { called: chatQueryCalled, data: chatQueryData, loading: chatQueryLoading }] = useLazyQuery(QUERY_CHAT, {
    variables: { chatId }
  });
  const { data: chatSubscriptionData, loading: chatSubscriptionLoading } = useSubscription(SUBSCRIPTION_CHAT, {
    variables: { chatId }
  });
  const [addMessage] = useMutation(MUTATION_ADD_MESSAGE);

  useEffect(() => {
    if (!chatSubscriptionLoading) {
      setMessages(chatSubscriptionData.chat.messages);
    } else if (chatSubscriptionLoading) {
      if (chatQueryCalled && !chatQueryLoading)
        setMessages(chatQueryData.chat.messages);
      else if (!chatQueryCalled)
        queryChat();
    }
  }, [chatQueryData, chatQueryCalled, chatQueryLoading, chatSubscriptionData, chatSubscriptionLoading]);

  const onSend = updatedMessages => {
    const [updatedMessage] = updatedMessages;
    addMessage({
      variables:
        { chatId, authorId: userId, body: updatedMessage.text }
    });
  };

  let content = <ConversationScreenPlaceholder />

  if (chatQueryCalled && !chatQueryLoading) {
    const transform = messages.map(message => {
      const { id, body, createdAt, author: {
        id: authorId,
        name,
        avatar
      } } = message;

      return {
        _id: id,
        text: body,
        createdAt: new Date(createdAt),
        user: {
          _id: authorId,
          name,
          avatar
        }
      };
    });

    content = (
      <GiftedChat
        isAnimated
        inverted={false}
        messages={transform}
        renderMessageText={CustomMessageText}
        renderSend={CustomSend}
        onSend={updatedMessages => onSend(updatedMessages)}
        user={{ _id: userId }}
        placeholder='Message...'
      />
    );
  }

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ConversationScreen;