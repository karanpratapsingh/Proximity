import React, { useEffect, useState, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Modalize from 'react-native-modalize';
import { ThemeColors } from '../../../types';
import { ModalHeader, FormInput } from '../../../layout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../../../context';
import { ThemeStatic } from '../../../theme/Colors';
import { responsiveHeight } from 'react-native-responsive-dimensions';

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

  useEffect(() => {
    setEditableName(name);
    setEditableHandle(handle);
    setEditableAbout(about);
  }, []);
  // const 
  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      modalStyle={styles().container}
      modalHeight={500}>
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
    height: 80,
    width: 80,
    marginTop: 20
  },
  avatarImage: {
    backgroundColor: theme.placeholder,
    borderRadius: 80
  },
  avatarOverlay: {
    position: 'absolute',
    height: 80,
    width: 80,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: theme.accent,
    opacity: 0.8
  }
});

export default EditProfileBottomSheet;