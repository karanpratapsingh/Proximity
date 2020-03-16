import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { IconSizes } from '@app/constants';
import { ThemeStatic } from '@app/theme';

const CustomScrollToBottom = () => <Entypo
  name='chevron-down'
  color={ThemeStatic.black}
  size={IconSizes.x4}
/>;

export default CustomScrollToBottom;