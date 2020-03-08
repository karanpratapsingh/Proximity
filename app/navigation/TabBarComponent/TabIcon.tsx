import React, { useContext } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { IconSizes } from '@app/constants';
import { AppContext } from '@app/context';

const TabIcon = ({ route, isActive }) => {
  const { theme } = useContext(AppContext);

  switch (route) {
    case 'HomeScreen':

      return <Entypo name='home' color={isActive ? theme.accent : theme.text02} size={IconSizes.x5} />;

    case 'ExploreScreen':

      return <AntDesign name='search1' color={isActive ? theme.accent : theme.text02} size={IconSizes.x5} />;

    case 'UploadScreen':

      return <AntDesign name='plus' color={isActive ? theme.accent : theme.text02} size={IconSizes.x5} />;

    case 'NotificationScreen':

      return <Feather name='bell' color={isActive ? theme.accent : theme.text02} size={IconSizes.x5} />;

    case 'ProfileScreen':

      return <AntDesign name='user' color={isActive ? theme.accent : theme.text02} size={IconSizes.x5} />;

    default:
      return null;
  };
};

export default TabIcon;