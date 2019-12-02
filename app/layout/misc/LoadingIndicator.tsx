import React from 'react';
import { DotIndicator } from 'react-native-indicators';

interface LoadingIndicatorProps {
  size: number,
  color?: string,
  count?: number
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size, color, count }) =>
  <DotIndicator size={size} color={color} count={count || 3} />;

export default LoadingIndicator;