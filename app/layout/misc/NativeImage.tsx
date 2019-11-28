import React from 'react';
import FastImage from 'react-native-fast-image';

interface NativeImageProps {
  uri: string,
  style: any
};

const NativeImage: React.FC<NativeImageProps> = ({ uri, style }) =>
  <FastImage style={style} source={{ uri, priority: FastImage.priority.normal }}
    // resizeMode={FastImage.resizeMode.contain}
  />

export default NativeImage;