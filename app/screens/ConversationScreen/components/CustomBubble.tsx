import React from 'react';
import { StyleSheet } from 'react-native';
import { Bubble } from 'react-native-gifted-chat';
import { ThemeStatic } from '../../../theme';
import posed, { Transition } from 'react-native-pose';

const TransitionBubble = posed.View({
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0.5, x: ({ delta }) => delta }
});

const CustomBubble: React.FC = bubbleProps => {
  // @ts-ignore
  const { user: { _id: authorId }, currentMessage: { user: { _id: currentId } } } = bubbleProps;

  const delta = authorId === currentId ? 20 : -20;

  return (
    <Transition delta={delta} animateOnMount>
      <TransitionBubble key='message-bubble' style={{ flex: 1, }}>
        <Bubble
          {...bubbleProps}
          // @ts-ignore
          wrapperStyle={{ right: styles.right }}
        />
      </TransitionBubble>
    </Transition>
  );
}
const styles = StyleSheet.create({
  right: {
    marginVertical: 20,
    backgroundColor: ThemeStatic.accent
  }
});

export default CustomBubble;