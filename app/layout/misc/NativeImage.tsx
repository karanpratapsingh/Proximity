import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface NativeImageProps {
  uri: string,
  style: any
};

const NativeImage: React.FC<NativeImageProps> = ({ uri, style }) => {

  if (!uri || !uri.includes('http')) return <View style={style} />;
  return <FastImage style={style} source={{ uri, priority: FastImage.priority.normal }} />
};

export default NativeImage;