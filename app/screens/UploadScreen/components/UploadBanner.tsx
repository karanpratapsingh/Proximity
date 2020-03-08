import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UploadSvg from '@app/assets/svg/upload.svg';
import { IconSizes, PostDimensions } from '@app/constants';
import { IconButton } from '@app/layout';
import SvgBanner from '@app/layout/misc/SvgBanner';
import { ThemeStatic } from '@app/theme';
import { getImageFromLibrary } from '@app/utils/shared';

interface UploadBannerProps {
  pickedAsset: string,
  onAsset: (path: string) => void
};

const UploadBanner: React.FC<UploadBannerProps> = ({ pickedAsset, onAsset }) => {
  const discardImage = () => onAsset('');

  const pickImage = async () => {
    //@ts-ignore
    const { path } = await getImageFromLibrary(340, 340);
    onAsset(path);
  };

  let content = (
    <SvgBanner
      Svg={UploadSvg}
      placeholder='Click to upload a new post'
      textStyle={styles.placeholderText}
    />
  );

  if (pickedAsset) {
    content = (
      <>
        <IconButton
          onPress={discardImage}
          style={styles.discardImageButton}
          Icon={() =>
            <AntDesign
              name='closecircle'
              color={ThemeStatic.white}
              size={IconSizes.x6}
            />}
        />
        <Image source={{ uri: pickedAsset }} style={styles.pickedImage} />
      </>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={pickImage} style={[styles.container, { borderWidth: pickedAsset ? 0 : StyleSheet.hairlineWidth }]}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...PostDimensions.Large,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderColor: ThemeStatic.accent,
    marginVertical: 20,
    borderRadius: 10
  },
  discardImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingBottom: 10,
    zIndex: 100
  },
  pickedImage: {
    ...PostDimensions.Large,
    borderRadius: 10
  },
  placeholderText: {
    color: ThemeStatic.accent
  }
});

export default UploadBanner;