import React, { useContext } from 'react';
import { Shine, ShineOverlay } from 'rn-placeholder';
import { AppContext } from '@app/context';
import { ThemeVariant } from '@app/theme';

const AnimationBackground = {
  light: '#DFDFDF',
  dark: '#242424'
};

const PlaceholderAnimation = props => {
  const { themeType } = useContext(AppContext);
  const backgroundColor = AnimationBackground[themeType];

  if (themeType === ThemeVariant.light) {
    return <ShineOverlay {...props} />;
  }

  return <Shine {...props} style={{ backgroundColor }} />;
};

export default PlaceholderAnimation;