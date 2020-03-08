import { useLazyQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { IconSizes, Routes } from '@app/constants';
import { AppContext } from '@app/context';
import { MUTATION_ADD_MESSAGE, MUTATION_CONNECT_CHAT_TO_USERS } from '@app/graphql/mutation';
import { QUERY_CHAT } from '@app/graphql/query';
import { SUBSCRIPTION_CHAT } from '@app/graphql/subscription';
import { ConversationScreenPlaceholder, GoBackHeader } from '@app/layout';
import { ThemeColors } from '@app/types/theme';
import { transformMessages } from '@app/utils/shared';
import ChatHeaderAvatar from './components/ChatHeaderAvatar';
import CustomBubble from './components/CustomBubble';
import CustomComposer from './components/CustomComposer';
import CustomInputToolbar from './components/CustomInputToolbar';
import CustomMessageText from './components/CustomMessageText';
import CustomSend from './components/CustomSend';
import CustomScrollToBottom from './components/CustomScrollToBottom';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const ConversationScreen: React.FC = () => {
  const chatId = useNavigationParam('chatId');
  const handle = useNavigationParam('handle');
  const avatar = useNavigationParam('avatar');
  const targetId = useNavigationParam('targetId');

  const { navigate } = useNavigation();
  const { user, theme } = useContext(AppContext);
  const [messages, setMessages] = useState([]);

  const [queryChat, {
    called: chatQueryCalled,
    data: chatQueryData,
    loading: chatQueryLoading,
    error: chatQueryError
  }] = useLazyQuery(QUERY_CHAT, {
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

  const navigateToProfile = () => {
    navigate(Routes.ProfileViewScreen, { userId: targetId });
  };

  let content = <ConversationScreenPlaceholder />

  if (chatQueryCalled && !chatQueryLoading && !chatQueryError) {
    const transform = transformMessages(messages);

    content = (
      <GiftedChat
        scrollToBottom
        alwaysShowSend
        inverted={false}
        maxInputLength={200}
        messages={transform}
        scrollToBottomComponent={CustomScrollToBottom}
        textInputProps={{ disable: true }}
        renderComposer={composerProps => <CustomComposer {...composerProps} />}
        renderMessageText={CustomMessageText}
        renderBubble={CustomBubble}
        renderSend={CustomSend}
        renderInputToolbar={CustomInputToolbar}
        onSend={onSend}
        onPressAvatar={navigateToProfile}
        user={{ _id: user.id }}
        bottomOffset={ifIphoneX(20, -10)}
        keyboardShouldPersistTaps={null}
        listViewProps={{ showsVerticalScrollIndicator: false, style: { marginBottom: 16 } }}
      />
    );
  }

  return (
    <View style={styles(theme).container}>
      <GoBackHeader
        title={handle}
        onTitlePress={navigateToProfile}
        iconSize={IconSizes.x7}
        ContentLeft={() => <ChatHeaderAvatar avatar={avatar} onPress={navigateToProfile} />}
        titleStyle={styles().headerTitleStyle}
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
  headerTitleStyle: {
    marginLeft: 0
  }
});

export default ConversationScreen;