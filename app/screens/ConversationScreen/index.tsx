import { useLazyQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigationParam } from 'react-navigation-hooks';
import { IconSizes } from '../../constants';
import { AppContext } from '../../context';
import { MUTATION_ADD_MESSAGE, MUTATION_CONNECT_CHAT_TO_USERS } from '../../graphql/mutation';
import { QUERY_CHAT } from '../../graphql/query';
import { SUBSCRIPTION_CHAT } from '../../graphql/subscription';
import { ConversationScreenPlaceholder, GoBackHeader } from '../../layout';
import { ThemeColors } from '../../types';
import { transformMessages } from '../../utils/shared';
import CustomBubble from './components/CustomBubble';
import CustomComposer from './components/CustomComposer';
import CustomMessageText from './components/CustomMessageText';
import CustomSend from './components/CustomSend';
import CustomInputToolbar from './components/CustomInputToolbar';

const ConversationScreen = () => {
  const chatId = useNavigationParam('chatId');
  const handle = useNavigationParam('handle');
  const targetId = useNavigationParam('targetId');
  const { user, theme } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [queryChat, { called: chatQueryCalled, data: chatQueryData, loading: chatQueryLoading, error: chatQueryError }] = useLazyQuery(QUERY_CHAT, {
    variables: { chatId },
    fetchPolicy: 'network-only'
  });
  const { data: chatSubscriptionData, loading: chatSubscriptionLoading } = useSubscription(SUBSCRIPTION_CHAT, {
    variables: { chatId }
  });
  const [addMessage] = useMutation(MUTATION_ADD_MESSAGE);
  const [connectChat] = useMutation(MUTATION_CONNECT_CHAT_TO_USERS);

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

  const onSend = async updatedMessages => {
    const isFirstMessage = messages.length === 0;
    const [updatedMessage] = updatedMessages;
    if (isFirstMessage) {
      await connectChat({
        variables: {
          chatId,
          userId: user.id,
          targetId
        }
      });
    }
    addMessage({
      variables: {
        chatId,
        authorId: user.id,
        body: updatedMessage.text
      }
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
        renderInputToolbar={CustomInputToolbar}
        onSend={updatedMessages => onSend(updatedMessages)}
        user={{ _id: user.id }}
        listViewProps={{ showsVerticalScrollIndicator: false, style: { marginBottom: 16 } }}
      />
    );
  }

  return (
    <View style={styles(theme).container}>
      <GoBackHeader title={handle} iconSize={IconSizes.x6} />
      {content}
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  }
});

export default ConversationScreen;