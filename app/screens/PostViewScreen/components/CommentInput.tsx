import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useState } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconSizes } from '../../../constants';
import { AppContext } from '../../../context';
import { MUTATION_ADD_COMMENT } from '../../../graphql/mutation';
import { IconButton, LoadingIndicator, NativeImage } from '../../../layout';
import { ThemeStatic, Typography } from '../../../theme';
import { ThemeColors } from '../../../types/theme';

const { FontWeights, FontSizes } = Typography;

interface CommentInputProps {
  postId: string
};

const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {

  const { user, theme } = useContext(AppContext);
  const [comment, setComment] = useState('');
  const [addComment, { loading }] = useMutation(MUTATION_ADD_COMMENT);

  const postComment = async () => {
    if (comment.length < 1) return alert('[warning]: cannot be empty');
    if (comment.length > 200) return alert('[warning]: cannot be greater than 200');
    await addComment({ variables: { userId: user.id, postId, body: comment } });
    setComment('');
  };

  let content = (
    <View style={styles().loading}>
      <LoadingIndicator color={ThemeStatic.accent} size={IconSizes.x00} />
    </View>
  );

  if (!loading) {
    content = (
      <IconButton
        Icon={() =>
          <MaterialIcons name='done'
            size={IconSizes.x6}
            color={ThemeStatic.accent}
          />}
        onPress={postComment}
        style={styles().postButton}
      />
    );
  }

  return (
    <View style={styles().container}>
      <NativeImage
        uri={user.avatar}
        style={styles(theme).commentAvatarImage}
      />
      <TextInput
        autoCorrect={false}
        style={styles(theme).commentTextInput}
        value={comment}
        placeholder={`Add a comment as ${user.handle}...`}
        placeholderTextColor={theme.text02}
        onChangeText={setComment}
      />
      {content}
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: theme.base
  },
  commentAvatarImage: {
    height: 36,
    width: 36,
    backgroundColor: theme.placeholder,
    marginRight: 10,
    borderRadius: 50
  },
  commentTextInput: {
    flex: 1,
    ...FontWeights.Light,
    ...FontSizes.Body,
    paddingVertical: Platform.select({ ios: 8, android: 6 }),
    paddingHorizontal: 20,
    backgroundColor: theme.placeholder,
    color: theme.text01,
    borderRadius: 20,
    marginVertical: 5
  },
  loading: {
    marginLeft: 10
  },
  postButton: {
    width: undefined,
    marginLeft: 10
  }
});

export default CommentInput;