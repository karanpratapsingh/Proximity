import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { AppContext } from '../../context';
import { Typography } from '../../theme';
import { ThemeColors } from '../../types';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '../../constants';
import { NativeImage } from '..';

const { FontWeights, FontSizes } = Typography;

interface UserCardProps {
  userId: string,
  avatar: string,
  handle: string,
  name: string,
  style?: StyleProp<ViewStyle>
};

const UserCard: React.FC<UserCardProps> = ({ userId, avatar, handle, name, style }) => {

  const { user, theme } = useContext(AppContext);
  const { navigate } = useNavigation();

  const navigateToProfile = () => {
    if (userId === user.id) return;
    navigate(Routes.ProfileViewScreen, { userId });
  };

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={navigateToProfile} style={[styles().container, style]}>
      <NativeImage uri={avatar} style={styles(theme).avatarImage} />
      <View style={styles().info}>
        <Text style={styles(theme).handleText}>{handle}</Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles(theme).nameText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    width: '100%',
  },
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: theme.placeholder
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
  handleText: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: theme.text01
  },
  nameText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: theme.text02,
    marginTop: 5
  }
});

export default UserCard;