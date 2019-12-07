import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { FollowInteractionType, IconSizes, Routes, PollIntervals } from '../../../constants';
import { AppContext } from '../../../context';
import client from '../../../graphql/client';
import { MUTATION_CREATE_TEMPORARY_CHAT, MUTATION_UPDATE_FOLLOWING } from '../../../graphql/mutation';
import { QUERY_CHAT_EXISTS, QUERY_DOES_FOLLOW } from '../../../graphql/query';
import { LoadingIndicator } from '../../../layout';
import { Typography } from '../../../theme';
import { ThemeColors } from '../../../types/theme';

const { FontWeights, FontSizes } = Typography;

const UserInteractions = ({ targetId, handle }) => {

  const { navigate } = useNavigation();
  const { user, theme } = useContext(AppContext);
  const { data: doesFollowData, loading: doesFollowLoading, error: doesFollowError } = useQuery(QUERY_DOES_FOLLOW, {
    variables: { userId: user.id, targetId },
    pollInterval: PollIntervals.interaction
  });

  const [chatExistsQuery] = useLazyQuery(QUERY_CHAT_EXISTS);
  const [updateFollowing, { loading: updateFollowingLoading }] = useMutation(MUTATION_UPDATE_FOLLOWING);
  const [createTemporaryChat] = useMutation(MUTATION_CREATE_TEMPORARY_CHAT);

  let content = <LoadingIndicator size={IconSizes.x0} color={theme.white} />;

  if (!doesFollowLoading && !updateFollowingLoading && !doesFollowError) {
    const { doesFollow } = doesFollowData;
    content = (
      <Text style={styles(theme).followInteractionText}>
        {`${doesFollow ? 'FOLLOWING' : 'FOLLOW'}`}
      </Text>
    );
  }

  const followInteraction = () => {
    if (doesFollowLoading) return;

    const { doesFollow } = doesFollowData;
    const updateFollowingArgs = { userId: user.id, targetId };
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
        variables: { userId: user.id, targetId }
      });

      if (chatExists) {
        navigate(Routes.ConversationScreen, { chatId: chatExists.id, handle, targetId: null });
      } else {
        const { data } = await createTemporaryChat();
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