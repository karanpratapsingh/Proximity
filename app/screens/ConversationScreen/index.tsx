import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks';
import { GiftedChat } from 'react-native-gifted-chat';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CHAT } from '../../graphql/query';

const userId = 'ck2oj3x2n001w0765e34k94w1';

const ConversationScreen = () => {
  const chatId = useNavigationParam('chatId');
  const { data, loading } = useQuery(QUERY_CHAT, {
    variables: { chatId }
  });

  const [messages, setMessages] = useState([]);
  const onSend = updateMessages => {
    setMessages([...GiftedChat.append(messages, updateMessages)]);
  };

  let content = <ActivityIndicator />;

  if (!loading) {

    const { chat: {
      messages
    } } = data;

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
        messages={transform}
        onSend={updateMessages => onSend(updateMessages)}
        user={{ _id: userId }}
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
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});

export default ConversationScreen;