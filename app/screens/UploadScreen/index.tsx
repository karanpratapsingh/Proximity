import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { IconSizes } from '../../constants';
import { AppContext } from '../../context';
import { Button, FormInput, Header } from '../../layout';
import { ThemeStatic } from '../../theme';
import { ThemeColors } from '../../types';
import UploadBanner from './components/UploadBanner';

const UploadScreen: React.FC = () => {

  const { theme } = useContext(AppContext);
  const [pickedAsset, setPickedAsset] = useState('');
  const [caption, setCaption] = useState('');

  const uploadImage = () => {

  };

  return (
    <View style={styles(theme).container}>
      <Header title='Upload' />
      <ScrollView style={styles().content}>
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
          loading={false}
          containerStyle={styles().uploadButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.base
  },
  content: {
    flex: 1,
    // justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  uploadButton: {
    marginVertical: 20
  }
});

export default UploadScreen;