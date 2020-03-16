import React from 'react';
import { StyleSheet } from 'react-native';
import { Bubble } from 'react-native-gifted-chat';
import { ThemeStatic } from '@app/theme';
import posed, { Transition } from 'react-native-pose';

const TransitionBubble = posed.View({
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0.5, x: ({ offset }) => offset }
});

const CustomBubble: React.FC = bubbleProps => {
  // @ts-ignore
  const { user: { _id: authorId }, currentMessage: { user: { _id: currentId } } } = bubbleProps;

  const offset = authorId === currentId ? 20 : -20;

  return (
    <Transition offset={offset} animateOnMount>
      <TransitionBubble key='message-bubble' style={styles.container}>
        <Bubble
          {...bubbleProps}
          // @ts-ignore
          wrapperStyle={{ right: styles.right }}
        />
      </TransitionBubble>
    </Transition>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  right: {
    marginVertical: 4,
    backgroundColor: ThemeStatic.accent
  }
});

export default CustomBubble;