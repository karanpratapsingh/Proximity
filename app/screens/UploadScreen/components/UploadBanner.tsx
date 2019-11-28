import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UploadSvg from '../../../../assets/svg/upload.svg';
import { IconSizes, PostDimensions } from '../../../constants';
import { IconButton } from '../../../layout';
import SvgBanner from '../../../layout/misc/SvgBannerType';
import { ThemeStatic } from '../../../theme';

console.disableYellowBox = true;
const UploadBanner = () => {
  const [pickedImage, setPickedImage] = useState('');

  const discardImage = () => setPickedImage('');

  const pickImage = async () => {
    const options = {
      width: 340,
      height: 340,
      cropping: true,
      cropperActiveWidgetColor: ThemeStatic.accent,
      cropperStatusBarColor: ThemeStatic.accent,
      cropperToolbarColor: ThemeStatic.accent,
      compressImageQuality: 0.5,
      mediaType: 'photo'
    };
    //@ts-ignore
    const { path } = await ImagePicker.openPicker(options);
    setPickedImage(path);
  };

  let content = (
    <SvgBanner
      Svg={UploadSvg}
      placeholder='Click to upload a new post'
      textStyle={styles.placeholderText}
    />
  );

  if (pickedImage) {
    content = (
      <>
        <IconButton
          Icon={() =>
            <AntDesign
              name='closecircle'
              color={ThemeStatic.white}
              size={IconSizes.x6}
            />}
          onPress={discardImage}
          style={styles.discardImageButton}
        />
        <Image source={{ uri: pickedImage }} style={styles.pickedImage} />
      </>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={pickImage} style={[styles.container, { borderWidth: pickedImage ? 0 : StyleSheet.hairlineWidth }]}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...PostDimensions.Large,
    alignSelf: 'center',
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