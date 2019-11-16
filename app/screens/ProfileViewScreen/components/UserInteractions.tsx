import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeColors } from '../../../types';
import { Typography } from '../../../theme';
import { ThemeContext } from '../../../context/ThemeContext';
import { LoadingIndicator } from '../../../layout';

const { FontWeights, FontSizes, IconSizes } = Typography;

const UserInteractions = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles().container}>
      <TouchableOpacity activeOpacity={0.90} onPress={() => null} style={styles(theme).followInteraction}>
        <LoadingIndicator size={IconSizes.x0} color={theme.white} />
        {/* <Text style={styles(theme).followInteractionText}>FOLLOW</Text> */}
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.90} onPress={() => null} style={styles(theme).messageInteraction}>
        <Text style={styles(theme).messageInteractionText}>MESSAGE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
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
  }
});

export default UserInteractions;