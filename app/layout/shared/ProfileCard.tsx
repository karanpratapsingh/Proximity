import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemeColors } from '../../types';
import { Typography } from '../../theme';
import { ThemeContext } from '../../context/ThemeContext';
import { parseConnectionsCount } from '../../utils';

const { FontWeights, FontSizes } = Typography;

interface ConnectionsType {
  total: string,
  type: string
};

const Connections: React.FC<ConnectionsType> = ({ total, type }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles(theme).connections}>
      <Text style={styles(theme).connectionsText}>{total}</Text>
      <Text style={styles(theme).connectionsType}>{type}</Text>
    </View>
  );
};

interface ProfileCardType {
  viewMode?: boolean,
  avatar: string,
  following: number,
  followers: number,
  name: string,
  handle: string,
  about: string
};

const ProfileCard: React.FC<ProfileCardType> = ({ viewMode, avatar, following, followers, name, handle, about }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).info}>
        <Connections total={parseConnectionsCount(following)} type='FOLLOWING' />
        <Image
          source={{ uri: avatar }}
          style={styles(theme).avatarImage}
        />
        <Connections total={parseConnectionsCount(followers)} type='FOLLOWERS' />
      </View>
      <View style={styles(theme).name}>
        <Text style={styles(theme).usernameText}>{name}</Text>
        <Text style={styles(theme).handleText}>{handle}</Text>
      </View>
      {viewMode && <View style={styles().interact}>
        <TouchableOpacity activeOpacity={0.90} onPress={() => null} style={styles(theme).followInteraction}>
          <Text style={styles(theme).followInteractionText}>FOLLOW</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.90} onPress={() => null} style={styles(theme).messageInteraction}>
          <Text style={styles(theme).messageInteractionText}>MESSAGE</Text>
        </TouchableOpacity>
      </View>}

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
    paddingHorizontal: 10
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatarImage: {
    height: 120,
    width: 120,
    borderRadius: 120,
    backgroundColor: theme.placeholder
  },
  connections: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionsText: {
    ...FontWeights.Bold,
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
  interact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  followInteraction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    paddingVertical: 7,
    borderRadius: 40,
    backgroundColor: theme.accent
  },
  messageInteraction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingVertical: 7,
    borderRadius: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.accent
  },
  followInteractionText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: theme.white
  },
  messageInteractionText: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: theme.accent
  },
  about: {
    padding: 16,
    marginTop: 16,
    backgroundColor: theme.accent,
    borderRadius: 5,
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