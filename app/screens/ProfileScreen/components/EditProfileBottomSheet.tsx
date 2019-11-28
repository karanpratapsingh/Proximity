import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modalize from 'react-native-modalize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconSizes } from '../../../constants';
import { AppContext } from '../../../context';
import { MUTATION_UPDATE_USER } from '../../../graphql/mutation';
import { QUERY_HANDLE_AVAILABLE } from '../../../graphql/query';
import { BottomSheetHeader, Button, FormInput, LoadingIndicator } from '../../../layout';
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

  const { user, theme } = useContext(AppContext);

  const [editableAvatar, setEditableAvatar] = useState('');
  const [editableName, setEditableName] = useState('');
  const [editableHandle, setEditableHandle] = useState('');
  const [handleError, setHandleError] = useState('');
  const [editableAbout, setEditableAbout] = useState('');

  const [queryIsHandleAvailable, {
    loading: isHandleAvailableLoading,
    called: isHandleAvailableCalled,
    data: isHandleAvailableData
  }] = useLazyQuery(QUERY_HANDLE_AVAILABLE);

  const [updateUser, { loading: updateUserLoading }] = useMutation(MUTATION_UPDATE_USER);

  useEffect(() => {
    setEditableAvatar(avatar);
    setEditableName(name);
    setEditableHandle(handle);
    setEditableAbout(about);
  }, []);

  useEffect(() => {
    queryIsHandleAvailable({
      variables: {
        userId: user.id,
        handle: editableHandle
      }
    });
  }, [editableHandle]);

  useEffect(() => {
    if (!isHandleAvailableLoading && isHandleAvailableCalled) {
      const { isHandleAvailable } = isHandleAvailableData;
      if (!isHandleAvailable) {
        setHandleError('username not available');
      } else {
        setHandleError('');
      }
    }
  }, [isHandleAvailableLoading, isHandleAvailableCalled, isHandleAvailableData]);

  const onDone = () => {
    //?TODO-Later: show error in fields
    //?TODO-Later: implement image get and upload logic
    const { isHandleAvailable } = isHandleAvailableData;
    if (editableAbout.trim().length > 200) return;
    if (!isHandleAvailable) return;

    updateUser({
      variables: {
        userId: user.id,
        avatar: editableAvatar,
        name: editableName.trim(),
        handle: editableHandle.trim(),
        about: editableAbout.trim()
      }
    });
    //@ts-ignore
    ref.current.close();
  };

  let content = (
    <View>
      <LoadingIndicator size={4} color={theme.accent} />
    </View>
  );

  if (!isHandleAvailableLoading && isHandleAvailableCalled) {
    content = <MaterialIcons name={isHandleAvailableData.isHandleAvailable ? 'done' : 'close'} color={isHandleAvailableData.isHandleAvailable ? 'green' : 'red'} size={IconSizes.x6} />;
  }

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{
        showsVerticalScrollIndicator: false
      }}
      modalStyle={styles(theme).container}
      adjustToContentHeight>
      <BottomSheetHeader
        heading='Edit profile'
        subHeading='Edit your personal information'
      />
      <View style={styles().content}>
        <ImageBackground
          source={{ uri: editableAvatar }}
          style={styles(theme).avatar}
          imageStyle={styles(theme).avatarImage}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => null} style={styles(theme).avatarOverlay}>
            <MaterialIcons name='edit' size={24} color={ThemeStatic.white} />
          </TouchableOpacity>
        </ImageBackground>

        <FormInput
          label='Name'
          value={editableName}
          onChangeText={setEditableName}
        />
        <FormInput
          label='Username'
          error={handleError}
          value={editableHandle}
          onChangeText={setEditableHandle}>
          {content}
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
          loading={updateUserLoading}
          containerStyle={styles().doneButton}
        />
      </View>
    </Modalize>
  );
});

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.base
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