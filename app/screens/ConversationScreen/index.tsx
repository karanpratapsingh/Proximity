import { useLazyQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigationParam } from 'react-navigation-hooks';
import { MUTATION_ADD_MESSAGE } from '../../graphql/mutation';
import { QUERY_CHAT } from '../../graphql/query';
import { SUBSCRIPTION_CHAT } from '../../graphql/subscription';
import { ChatHeader, ConversationScreenPlaceholder } from '../../layout';
import { transformMessages } from '../../utils';
import CustomBubble from './components/CustomBubble';
import CustomComposer from './components/CustomComposer';
import CustomMessageText from './components/CustomMessageText';
import CustomSend from './components/CustomSend';

const userId = {
  '@occult_686': 'ck2oj3x2n001w0765e34k94w1',
  '@ayushieee': 'ck2oj8o2m00290765ckrg3ozy',
  '@doggo': 'ck2ojhiw1002v0765ou6bdsl8'
}['@occult_686'];

const ConversationScreen = () => {
  const chatId = useNavigationParam('chatId');
  const handle = useNavigationParam('handle');
  const [messages, setMessages] = useState([]);
  const [queryChat, { called: chatQueryCalled, data: chatQueryData, loading: chatQueryLoading, error: chatQueryError }] = useLazyQuery(QUERY_CHAT, {
    variables: { chatId },
    fetchPolicy: 'network-only'
  });
  const { data: chatSubscriptionData, loading: chatSubscriptionLoading } = useSubscription(SUBSCRIPTION_CHAT, {
    variables: { chatId }
  });
  const [addMessage] = useMutation(MUTATION_ADD_MESSAGE);

  useEffect(() => {
    if (!chatSubscriptionLoading) {
      setMessages(chatSubscriptionData.chat.messages);
    } else if (chatSubscriptionLoading) {
      if (chatQueryCalled && !chatQueryLoading) {
        setMessages(chatQueryData.chat.messages);
      } else if (!chatQueryCalled) {
        queryChat();
      }
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

  if (chatQueryCalled && !chatQueryLoading && !chatQueryError) {
    const transform = transformMessages(messages);

    content = (
      <GiftedChat
        isAnimated
        inverted={false}
        messages={transform}
        renderComposer={CustomComposer}
        renderMessageText={CustomMessageText}
        renderBubble={CustomBubble}
        renderSend={CustomSend}
        onSend={updatedMessages => onSend(updatedMessages)}
        user={{ _id: userId }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ChatHeader handle={handle} />
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