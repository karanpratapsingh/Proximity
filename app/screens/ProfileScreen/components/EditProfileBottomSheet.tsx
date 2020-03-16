import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconSizes, Asset, Errors } from '@app/constants';
import { AppContext } from '@app/context';
import { MUTATION_UPDATE_USER } from '@app/graphql/mutation';
import { QUERY_HANDLE_AVAILABLE } from '@app/graphql/query';
import { BottomSheetHeader, Button, FormInput, LoadingIndicator } from '@app/layout';
import { ThemeStatic, HandleAvailableColor } from '@app/theme';
import { ThemeColors } from '@app/types/theme';
import { getImageFromLibrary } from '@app/utils/shared';
import { uploadToStorage, crashlytics } from '@app/utils/firebase';
import { inputLimitErrorNotification, showErrorNotification, uploadErrorNotification, somethingWentWrongErrorNotification } from '../../../utils/notifications';

interface EditProfileBottomSheetProps {
  ref: React.Ref<any>,
  avatar: string,
  name: string,
  handle: string,
  about: string
};

const EditProfileBottomSheet: React.FC<EditProfileBottomSheetProps> = React.forwardRef(({ avatar, name, handle, about }, ref) => {

  const { user, updateUser: updateUserContext, theme } = useContext(AppContext);

  const [editableAvatar, setEditableAvatar] = useState('');
  const [editableName, setEditableName] = useState('');
  const [editableHandle, setEditableHandle] = useState('');
  const [handleError, setHandleError] = useState('');
  const [editableAbout, setEditableAbout] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const [queryIsHandleAvailable, {
    loading: isHandleAvailableLoading,
    called: isHandleAvailableCalled,
    data: isHandleAvailableData
  }] = useLazyQuery(QUERY_HANDLE_AVAILABLE);

  const [updateUser] = useMutation(MUTATION_UPDATE_USER);

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
        if (!editableHandle) setHandleError('username cannot be empty')
        else setHandleError('');
      }
    }
  }, [editableHandle, isHandleAvailableLoading, isHandleAvailableCalled, isHandleAvailableData]);

  const onAvatarPick = async () => {
    //@ts-ignore
    const { path } = await getImageFromLibrary(120, 120, true);
    setEditableAvatar(path);
  };

  const onDone = async () => {
    const { isHandleAvailable } = isHandleAvailableData;

    if (!editableName.trim().length) {
      showErrorNotification('Name cannot be empty');
      return;
    }
    if (editableAbout.trim().length > 200) {
      inputLimitErrorNotification('About', 'less', 200);
      return;
    }
    if (!isHandleAvailable) {
      showErrorNotification('Username is not available');
      return;
    }
    if (!editableHandle) {
      showErrorNotification('Username cannot be empty');
      return;
    }
    if (editableHandle.split(' ').length > 1) {
      showErrorNotification('Username cannot contain blank spaces');
      return;
    }

    const avatarChanged = avatar !== editableAvatar;

    try {
      setIsUploading(true);

      const updatedProfileData = {
        userId: user.id,
        avatar: editableAvatar,
        name: editableName.trim(),
        handle: editableHandle.trim(),
        about: editableAbout.trim()
      };

      if (avatarChanged) {
        const { downloadURL } = await uploadToStorage(Asset.avatar, editableAvatar, user.id);
        //@ts-ignore
        updatedProfileData.avatar = downloadURL;
      }

      const { data: { updateUser: { id, avatar: updatedAvatar, handle: updatedHandle } } } = await updateUser({ variables: updatedProfileData });
      updateUserContext({ id, avatar: updatedAvatar, handle: updatedHandle });
      setIsUploading(false);
      //@ts-ignore
      ref.current.close();
    } catch ({ message }) {
      if (avatarChanged) {
        uploadErrorNotification('Avatar');
      } else {
        somethingWentWrongErrorNotification();
      }
      crashlytics.recordCustomError(Errors.ASSET_UPLOAD, message);
    }
  };

  const setHandle = (handle: string) => {
    if (!handle) setHandleError('username cannot be empty');
    setEditableHandle(handle);
  }

  let content = (
    <View>
      <LoadingIndicator size={IconSizes.x00} color={theme.accent} />
    </View>
  );

  if (!isHandleAvailableLoading && isHandleAvailableCalled) {
    content = (
      <MaterialIcons
        name={isHandleAvailableData.isHandleAvailable ? 'done' : 'close'}
        color={HandleAvailableColor[isHandleAvailableData.isHandleAvailable]}
        size={IconSizes.x6}
      />
    );
  }

  const Icon = () => <MaterialIcons
    name='done'
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
        heading='Edit profile'
        subHeading='Edit your personal information'
      />
      <View style={styles().content}>
        <ImageBackground
          source={{ uri: editableAvatar ? editableAvatar : '' }}
          style={styles(theme).avatar}
          imageStyle={styles(theme).avatarImage}>
          <TouchableOpacity activeOpacity={0.9} onPress={onAvatarPick} style={styles(theme).avatarOverlay}>
            <MaterialIcons name='edit' size={IconSizes.x6} color={ThemeStatic.white} />
          </TouchableOpacity>
        </ImageBackground>

        <FormInput
          ref={null}
          label='Name'
          placeholder='example: Doggo'
          value={editableName}
          onChangeText={setEditableName}
        />
        <FormInput
          ref={null}
          label='Username'
          placeholder='example: doggo'
          error={handleError}
          value={editableHandle}
          onChangeText={setHandle}>
          {content}
        </FormInput>
        <FormInput
          ref={null}
          label='About'
          placeholder='example: hey, I am a doggo'
          value={editableAbout}
          onChangeText={setEditableAbout}
          multiline
          characterRestriction={200}
        />
        <Button
          Icon={Icon}
          label='Done'
          onPress={onDone}
          loading={isUploading}
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