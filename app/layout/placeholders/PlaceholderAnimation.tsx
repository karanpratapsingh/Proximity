import React, { useContext } from 'react';
import { Fade } from 'rn-placeholder';
import { AppContext } from '../../context';

const AnimationBackground = {
  light: '#dfdfdf',
  dark: '#242424'
};

const PlaceholderAnimation = props => {
  const { themeType } = useContext(AppContext);
  const backgroundColor = AnimationBackground[themeType];

  return <Fade {...props} style={{ backgroundColor }} />;
};

export default PlaceholderAnimation;