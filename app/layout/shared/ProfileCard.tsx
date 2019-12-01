import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';
import { AppContext } from '../../context';
import { parseConnectionsCount } from '../../utils/shared';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeStatic } from '../../theme';

const { FontWeights, FontSizes } = Typography;

interface ConnectionsType {
  total: string,
  type: string
};

const Connections: React.FC<ConnectionsType> = ({ total, type }) => {
  const { theme } = useContext(AppContext);
  return (
    <View style={styles(theme).connections}>
      <Text style={styles(theme).connectionsText}>{total}</Text>
      <Text style={styles(theme).connectionsType}>{type}</Text>
    </View>
  );
};

interface EditProfileTYpe {
  onEdit: any
};

const EditProfile: React.FC<EditProfileTYpe> = ({ onEdit }) => {
  const { theme } = useContext(AppContext);
  return (
    <TouchableOpacity activeOpacity={1} onPress={onEdit} style={styles(theme).editProfile}>
      <MaterialIcons name='edit' size={16} color={ThemeStatic.white} />
    </TouchableOpacity>
  );
};

interface ProfileCardType {
  avatar: string,
  editable?: boolean,
  onEdit?: any,
  following: number,
  followers: number,
  name: string,
  handle: string,
  renderInteractions?: any,
  about: string
};

const ProfileCard: React.FC<ProfileCardType> = ({ avatar, editable, onEdit, following, followers, name, handle, renderInteractions, about }) => {
  const { theme } = useContext(AppContext);
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).info}>
        <Connections total={parseConnectionsCount(following)} type='FOLLOWING' />
        <ImageBackground
          source={{ uri: avatar }}
          style={styles(theme).avatar}
          imageStyle={styles(theme).avatarImage}>
          {editable && <EditProfile onEdit={onEdit} />}
        </ImageBackground>

        <Connections total={parseConnectionsCount(followers)} type='FOLLOWERS' />
      </View>
      <View style={styles(theme).name}>
        <Text style={styles(theme).usernameText}>{name}</Text>
        <Text style={styles(theme).handleText}>{handle}</Text>
      </View>
      {renderInteractions && renderInteractions()}
      <View style={styles(theme).about}>
        <Text style={styles(theme).aboutTitle}>About</Text>
        <Text style={styles(theme).aboutText}>{about}</Text>
      </View>
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 4,
    paddingHorizontal: 10
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar: {
    height: 120,
    width: 120
  },
  avatarImage: {
    backgroundColor: theme.placeholder,
    borderRadius: 120,
  },
  editProfile: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    width: 60,
    height: 30,
    borderWidth: 2,
    borderColor: theme.base,
    backgroundColor: theme.accent
  },
  connections: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionsText: {
    ...FontWeights.Regular,
    ...FontSizes.SubHeading,
    color: theme.text01
  },
  connectionsType: {
    ...FontWeights.Bold,
    ...FontSizes.Caption,
    color: theme.text02,
    marginTop: 5
  },
  name: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  usernameText: {
    ...FontWeights.Bold,
    ...FontSizes.SubHeading,
    color: theme.text01
  },
  handleText: {
    ...FontWeights.Bold,
    ...FontSizes.Body,
    color: theme.text02,
    marginTop: 5
  },
  about: {
    padding: 16,
    marginTop: 16,
    backgroundColor: theme.accent,
    borderRadius: 10,
    marginBottom: 10
  },
  aboutTitle: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    color: theme.white,
  },
  aboutText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: theme.white,
    marginTop: 5,
  }
});

export default ProfileCard;