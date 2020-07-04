import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from 'react-navigation-hooks';
import { Asset, IconSizes, Routes, Errors } from '@app/constants';
import { AppContext } from '@app/context';
import { MUTATION_CREATE_POST } from '@app/graphql/mutation';
import { Button, FormInput, Header } from '@app/layout';
import { ThemeStatic } from '@app/theme';
import { ThemeColors } from '@app/types/theme';
import { uploadToStorage, crashlytics } from '@app/utils/firebase';
import { inputLimitErrorNotification, noAssetInfoNotification, postUploadedNotification, uploadErrorNotification } from '@app/utils/notifications';
import UploadBanner from './components/UploadBanner';

const UploadScreen: React.FC = () => {

  const { user, theme } = useContext(AppContext);
  const { navigate } = useNavigation();

  const [pickedAsset, setPickedAsset] = useState('');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [createPost] = useMutation(MUTATION_CREATE_POST);

  const captionInputRef = useRef();

  const uploadImage = async () => {

    if (!pickedAsset) {
      noAssetInfoNotification();
      return;
    }

    if (caption.length > 200) {
      inputLimitErrorNotification('Caption', 'less', 200);
      return;
    }

    try {
      setIsUploading(true);
      const { downloadURL: uri } = await uploadToStorage(Asset.post, pickedAsset, user.id);

      const { data: { createPost: { id: postId } } } = await createPost({
        variables: {
          userId: user.id,
          uri,
          caption
        }
      });
      
      setIsUploading(false);
      setPickedAsset('')
      setCaption('');
      // @ts-ignore
      captionInputRef.current.clear();
      postUploadedNotification();
      navigate(Routes.PostViewScreen, { postId });
    } catch ({ message }) {
      setIsUploading(false);
      uploadErrorNotification('Post');
      crashlytics.recordCustomError(Errors.ASSET_UPLOAD, message);
    }
  };

  const Icon = () => <Feather
    name='upload-cloud'
    color={ThemeStatic.white}
    size={IconSizes.x5}
  />;

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  return (
    <KeyboardAvoidingView behavior={keyboardBehavior} style={styles(theme).container}>
      <Header title='Upload' />
      <ScrollView showsVerticalScrollIndicator={false} style={styles().content}>
        <UploadBanner pickedAsset={pickedAsset} onAsset={setPickedAsset} />
        <FormInput
          ref={captionInputRef}
          multiline
          label='Caption'
          placeholder='Write a caption...'
          value={caption}
          onChangeText={setCaption}
          characterRestriction={200}
        />
        <Button
          Icon={Icon}
          label='Upload'
          onPress={uploadImage}
          loading={isUploading}
          containerStyle={styles().uploadButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  },
  content: {
    flex: 1,
    paddingHorizontal: 20
  },
  uploadButton: {
    marginVertical: 20,
    marginBottom: 40
  }
});

export default UploadScreen;