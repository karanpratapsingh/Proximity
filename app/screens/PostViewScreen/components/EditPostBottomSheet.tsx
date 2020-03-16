import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Feather from 'react-native-vector-icons/Feather';
import { Errors, IconSizes } from '@app/constants';
import { AppContext } from '@app/context';
import { MUTATION_EDIT_POST } from '@app/graphql/mutation';
import { BottomSheetHeader, Button, FormInput } from '@app/layout';
import { ThemeStatic } from '@app/theme';
import { ThemeColors } from '@app/types/theme';
import { crashlytics } from '@app/utils/firebase';
import { postUpdatedNotification } from '@app/utils/notifications';

interface EditPostBottomSheetProps {
  ref: React.Ref<any>,
  postId: string,
  caption: string
};

const EditPostBottomSheet: React.FC<EditPostBottomSheetProps> = React.forwardRef(({ postId, caption }, ref) => {

  const { theme } = useContext(AppContext);
  const [editableCaption, setEditableCaption] = useState(caption);
  const [isUpdating, setIsUpdating] = useState(false);
  const editableCaptionRef = useRef();

  const [editPost] = useMutation(MUTATION_EDIT_POST);

  const updatePost = async () => {
    setIsUpdating(true);
    try {
      await editPost({ variables: { postId, caption: editableCaption } });
    } catch ({ message }) {
      crashlytics.recordCustomError(Errors.EDIT_POST, message);
    }
    setIsUpdating(false);
    postUpdatedNotification();
    // @ts-ignore
    ref.current.close();
  };

  const Icon = () => <Feather
    name='check'
    color={ThemeStatic.white}
    size={IconSizes.x5}
  />;

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles(theme).container}
      adjustToContentHeight>
      <BottomSheetHeader
        heading='Edit Post'
        subHeading='Edit your post'
      />
      <View style={styles().content}>
        <FormInput
          ref={editableCaptionRef}
          multiline
          label='Caption'
          placeholder='Update your caption...'
          value={editableCaption}
          onChangeText={setEditableCaption}
          characterRestriction={200}
        />
        <Button
          Icon={Icon}
          label='Update'
          onPress={updatePost}
          loading={isUpdating}
          containerStyle={styles().updateButton}
        />
      </View>
    </Modalize >
  );
});

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.base
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20
  },
  updateButton: {
    marginVertical: 20
  }
});

export default EditPostBottomSheet;