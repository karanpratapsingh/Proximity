import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SvgBanner from '../../../layout/misc/SvgBannerType';
import UploadSvg from '../../../../assets/svg/upload.svg';
import { ThemeStatic } from '../../../theme';

console.disableYellowBox = true;
const UploadBanner = props => (
  <View style={styles.container}>
    <SvgBanner
      Svg={UploadSvg}
      placeholder='Click to upload a new post'
      textStyle={styles.placeholderText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 320,
    width: '100%',
    alignSelf: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'dashed',
    borderColor: ThemeStatic.accent,
    marginTop: 20,
    borderRadius: 10
  },
  placeholderText: {
    color: ThemeStatic.accent
  }
});

export default UploadBanner;