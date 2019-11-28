import React, { useContext } from 'react';
import { ShineOverlay } from 'rn-placeholder';
import { AppContext } from '../../context';

const PlaceholderAnimation = props => {
  const { theme } = useContext(AppContext);
  return <ShineOverlay {...props} />;
};

export default PlaceholderAnimation;