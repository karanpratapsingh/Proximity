import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../../../context';
import { NativeImage } from '../../../layout';
import { Typography } from '../../../theme';
import { ThemeColors } from '../../../types';
import { parseTimeElapsed } from '../../../utils/shared';

const { FontWeights, FontSizes } = Typography;

const CommentCard = ({ avatar, handle, body, time }) => {

  const { theme } = useContext(AppContext);
  const timeElapsed = parseTimeElapsed(time);

  return (
    <View style={styles().container}>
      <NativeImage uri={avatar} style={styles(theme).avatarImage} />
      <View style={styles().info}>
        <Text style={styles(theme).commentText}>
          <Text style={styles(theme).handleText}>{handle}{' '}</Text>
          {body}
        </Text>
        <Text style={styles(theme).timeText}>{timeElapsed}</Text>
      </View>
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 20
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: theme.placeholder
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
  handleText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: theme.text01
  },
  commentText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: theme.text01
  },
  timeText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: theme.text02,
    paddingTop: 2
  }
});

export default CommentCard;