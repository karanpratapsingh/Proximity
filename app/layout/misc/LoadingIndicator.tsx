import React from 'react';
import { DotIndicator } from 'react-native-indicators';

interface LoadingIndicatorType {
  size: number,
  color?: string,
  count?: number
};

const LoadingIndicator: React.FC<LoadingIndicatorType> = ({ size, color, count }) =>
  <DotIndicator size={size} color={color} count={count || 3} />;

export default LoadingIndicator;