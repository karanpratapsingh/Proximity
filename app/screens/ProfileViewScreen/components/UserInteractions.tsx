import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeColors } from '../../../types';
import { Typography } from '../../../theme';
import { ThemeContext } from '../../../context/ThemeContext';
import { LoadingIndicator } from '../../../layout';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_DOES_FOLLOW } from '../../../graphql/query';
import { MUTATION_UPDATE_FOLLOWING } from '../../../graphql/mutation';
import { useNavigation } from 'react-navigation-hooks';
import { Routes } from '../../../navigation/Routes';

const { FontWeights, FontSizes, IconSizes } = Typography;

const UserInteractions = ({ targetId, handle }) => {

  const { navigate } = useNavigation();
  const { userId, theme } = useContext(ThemeContext);
  const { data: doesFollowData, loading: doesFollowLoading, error: doesFollowError } = useQuery(QUERY_DOES_FOLLOW, {
    variables: { userId, targetId },
    pollInterval: 500
  });

  const [updateFollowing, { loading: updateFollowingLoading, error: updateFollowingError }] = useMutation(MUTATION_UPDATE_FOLLOWING);

  let content = <LoadingIndicator size={IconSizes.x0} color={theme.white} />;

  if (!doesFollowLoading && !updateFollowingLoading && !doesFollowError) {
    const { doesFollow } = doesFollowData;
    content = (
      <Text style={styles(theme).followInteractionText}>
        {`${doesFollow ? 'UNFOLLOW' : 'FOLLOW'}`}
      </Text>
    );
  }

  const followInteraction = () => {
    const followInteractionType = {
      FOLLOW: 'FOLLOW',
      UNFOLLOW: 'UNFOLLOW'
    };
    if (doesFollowLoading) return;

    const { doesFollow } = doesFollowData;
    const updateFollowingArgs = { userId, targetId };
    if (doesFollow) {
      updateFollowing({
        variables: {
          ...updateFollowingArgs,
          action: followInteractionType.UNFOLLOW
        }
      });
    } else {
      updateFollowing({
        variables: {
          ...updateFollowingArgs,
          action: followInteractionType.FOLLOW
        }
      });
    }
  };

  const messageInteraction = () => {
    navigate(Routes.ConversationScreen, { chatId: null, handle });
  };

  return (
    <View style={styles().container}>
      <TouchableOpacity activeOpacity={0.90} onPress={followInteraction} style={styles(theme).followInteraction}>
        {content}
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.90} onPress={messageInteraction} style={styles(theme).messageInteraction}>
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