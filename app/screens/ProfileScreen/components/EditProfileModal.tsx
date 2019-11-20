import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modalize from 'react-native-modalize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../../../context';
import { Button, FormInput, ModalHeader } from '../../../layout';
import { ThemeStatic } from '../../../theme';
import { ThemeColors } from '../../../types';

interface EditProfileBottomSheetType {
  ref: React.Ref<any>,
  avatar: string,
  name: string,
  handle: string,
  about: string
};

const EditProfileBottomSheet: React.FC<EditProfileBottomSheetType> = React.forwardRef(({ avatar, name, handle, about }, ref) => {

  const { theme } = useContext(AppContext);
  const [editableName, setEditableName] = useState('');
  const [editableHandle, setEditableHandle] = useState('');
  const [editableAbout, setEditableAbout] = useState('');
  const modalHeight = 450 + ((about.length / 10) * 10);
  useEffect(() => {
    setEditableName(name);
    setEditableHandle(handle);
    setEditableAbout(about);
  }, []);

  const onDone = () => {
    //@ts-ignore
    ref.current.close();
  };

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{
        showsVerticalScrollIndicator: false
      }}
      modalStyle={styles().container}
      adjustToContentHeight>
      <ModalHeader
        heading='Edit profile'
        subHeading='Edit your personal information'
      />
      <View style={styles().content}>
        <ImageBackground
          source={{ uri: avatar }}
          style={styles(theme).avatar}
          imageStyle={styles(theme).avatarImage}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => null} style={styles(theme).avatarOverlay}>
            <MaterialIcons name='edit' size={24} color={ThemeStatic.white} />
          </TouchableOpacity>
        </ImageBackground>

        <FormInput label='Name' value={editableName} onChangeText={setEditableName} />
        <FormInput label='Username' value={editableHandle} onChangeText={setEditableHandle}>
          <MaterialIcons name='done' color='green' size={24} />
        </FormInput>
        <FormInput
          label='About'
          value={editableAbout}
          onChangeText={setEditableAbout}
          multiline
          characterRestriction={200}
        />
        <Button
          label='Done'
          onPress={onDone}
          loading={false}
          containerStyle={styles().doneButton}
        />
      </View>
    </Modalize>
  );
}
);

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    padding: 20
  },
  content: {
    flex: 1
  },
  avatar: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    marginTop: 20
  },
  avatarImage: {
    backgroundColor: theme.placeholder,
    borderRadius: 100
  },
  avatarOverlay: {
    position: 'absolute',
    height: 100,
    width: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: theme.accent,
    opacity: 0.8
  },
  doneButton: {
    marginVertical: 20
  }
});

export default EditProfileBottomSheet;