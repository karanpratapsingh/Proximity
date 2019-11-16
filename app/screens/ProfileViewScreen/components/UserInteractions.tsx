import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeColors } from '../../../types';
import { Typography } from '../../../theme';
import { AppContext } from '../../../context';
import { LoadingIndicator } from '../../../layout';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_DOES_FOLLOW, QUERY_CHAT_EXISTS } from '../../../graphql/query';
import { MUTATION_UPDATE_FOLLOWING, MUTATION_CREATE_TEMPORARY_CHAT } from '../../../graphql/mutation';
import { useNavigation } from 'react-navigation-hooks';
import { Routes, FollowInteractionType } from '../../../constants';
import client from '../../../graphql/client';

const { FontWeights, FontSizes, IconSizes } = Typography;

const UserInteractions = ({ targetId, handle }) => {

  const { navigate } = useNavigation();
  const { userId, theme } = useContext(AppContext);
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
    if (doesFollowLoading) return;

    const { doesFollow } = doesFollowData;
    const updateFollowingArgs = { userId, targetId };
    if (doesFollow) {
      updateFollowing({
        variables: {
          ...updateFollowingArgs,
          action: FollowInteractionType.UNFOLLOW
        }
      });
    } else {
      updateFollowing({
        variables: {
          ...updateFollowingArgs,
          action: FollowInteractionType.FOLLOW
        }
      });
    }
  };

  const messageInteraction = async () => {
    try {
      const { data: { chatExists } } = await client.query({
        query: QUERY_CHAT_EXISTS,
        variables: { userId, targetId }
      });

      if (chatExists) {
        navigate(Routes.ConversationScreen, { chatId: chatExists.id, handle, targetId: null });
      } else {
        const { data } = await client.mutate({
          mutation: MUTATION_CREATE_TEMPORARY_CHAT
        });
        navigate(Routes.ConversationScreen, { chatId: data.createTemporaryChat.id, handle, targetId });
      }
    } catch {
      // do something or show error
    }
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