import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Typography } from '../theme';

const { IconSizes } = Typography;

const TabIcon = ({ route }) => {
  switch (route) {
    case 'HomeScreen':

      return <Entypo name='home' size={IconSizes.x5} />;

    case 'ExploreScreen':

      return <AntDesign name='search1' size={IconSizes.x5} />;

    case 'UploadScreen':

      return <AntDesign name='plus' size={IconSizes.x5} />;

    case 'NotificationScreen':

      return <Feather name='bell' size={IconSizes.x5} />;

    case 'ProfileScreen':

      return <AntDesign name='user' size={IconSizes.x5} />;

    default:
      return null;
  };
};

export default TabIcon;