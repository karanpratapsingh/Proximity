import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemeColors } from '../../../types';
import { Typography } from '../../../theme';
import { ThemeContext } from '../../../context/ThemeContext';

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

const ProfileCard: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).info}>
        <Connections total='245' type='FOLLOWING' />
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' }}
          style={styles().avatarImage}
        />
        <Connections total='24K' type='FOLLOWERS' />
      </View>

      <View style={styles(theme).name}>
        <Text style={styles(theme).usernameText}>Charlotte Jefferson</Text>
        <Text style={styles(theme).handleText}>@charlotte_jeff</Text>
      </View>

      <View style={styles(theme).about}>
        <Text style={styles(theme).aboutTitle}>About</Text>
        <Text style={styles(theme).aboutText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </Text>
      </View>

    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    padding: 20,
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
  about: {
    padding: 20,
    marginVertical: 16,
    backgroundColor: theme.accent,
    borderRadius: 10
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