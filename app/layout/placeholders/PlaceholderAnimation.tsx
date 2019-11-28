import React, { useContext } from 'react';
import { Fade } from 'rn-placeholder';
import { AppContext } from '../../context';

const PlaceholderAnimation = props => {
  const { themeType } = useContext(AppContext);
  const backgroundColor = themeType === 'light' ? '#dfdfdf' : '#242424';
  return <Fade {...props} style={{ backgroundColor }} />;
};

export default PlaceholderAnimation;