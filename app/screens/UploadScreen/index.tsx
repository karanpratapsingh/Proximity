import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from 'react-navigation-hooks';
import { IconSizes, Routes } from '../../constants';
import { AppContext } from '../../context';
import { MUTATION_CREATE_POST } from '../../graphql/mutation';
import { Button, FormInput, Header } from '../../layout';
import { ThemeStatic } from '../../theme';
import { ThemeColors } from '../../types';
import { uploadToStorage } from '../../utils/firebase';
import UploadBanner from './components/UploadBanner';

const UploadScreen: React.FC = () => {

  const { user, theme } = useContext(AppContext);
  const { navigate } = useNavigation();

  const [pickedAsset, setPickedAsset] = useState('');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [createPost] = useMutation(MUTATION_CREATE_POST);

  const uploadImage = async () => {
    if (!pickedAsset) return;
    if (caption.length < 20) return; //? TODO: show alert or success

    setIsUploading(true);
    const { downloadURL: uri } = await uploadToStorage('posts', pickedAsset);

    // @ts-ignore
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
    navigate(Routes.PostViewScreen, { postId });
  };

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  return (
    <KeyboardAvoidingView behavior={keyboardBehavior} style={styles(theme).container}>
      <Header title='Upload' />
      <ScrollView showsVerticalScrollIndicator={false} style={styles().content}>
        <UploadBanner pickedAsset={pickedAsset} onAsset={setPickedAsset} />
        <FormInput
          multiline
          label='Caption'
          placeholder='Write a caption...'
          value={caption}
          onChangeText={setCaption}
          characterRestriction={200}
        />
        <Button
          Icon={() => <Feather
            name='upload-cloud'
            color={ThemeStatic.white}
            size={IconSizes.x5}
          />}
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