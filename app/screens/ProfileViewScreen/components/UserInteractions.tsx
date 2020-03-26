import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { FollowInteraction, IconSizes, Routes, PollIntervals, Errors } from '@app/constants';
import { AppContext } from '@app/context';
import client from '@app/graphql/client';
import { MUTATION_CREATE_TEMPORARY_CHAT, MUTATION_UPDATE_FOLLOWING } from '@app/graphql/mutation';
import { QUERY_CHAT_EXISTS, QUERY_DOES_FOLLOW } from '@app/graphql/query';
import { LoadingIndicator } from '@app/layout';
import { Typography } from '@app/theme';
import { ThemeColors } from '@app/types/theme';
import { crashlytics } from '@app/utils/firebase';
import { tryAgainLaterNotification } from '@app/utils/notifications';

const { FontWeights, FontSizes } = Typography;

interface UserInteractionsProps {
  targetId: string,
  avatar: string,
  handle: string
};

const UserInteractions: React.FC<UserInteractionsProps> = ({ targetId, avatar, handle }) => {

  const { navigate } = useNavigation();
  const { user, theme } = useContext(AppContext);
  const {
    data: doesFollowData,
    loading: doesFollowLoading,
    error: doesFollowError
  } = useQuery(QUERY_DOES_FOLLOW, {
    variables: { userId: user.id, targetId },
    pollInterval: PollIntervals.interaction
  });

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
          action: FollowInteraction.UNFOLLOW
        }
      });
    } else {
      updateFollowing({
        variables: {
          ...updateFollowingArgs,
          action: FollowInteraction.FOLLOW
        }
      });
    }
  };

  const messageInteraction = async () => {
    try {
      const { data: { chatExists } } = await client.query({
        query: QUERY_CHAT_EXISTS,
        variables: { userId: user.id, targetId },
        fetchPolicy: 'no-cache'
      });

      if (chatExists) {
        navigate(Routes.ConversationScreen, { chatId: chatExists.id, avatar, handle, targetId });
      } else {
        const { data } = await createTemporaryChat();
        navigate(Routes.ConversationScreen, { chatId: data.createTemporaryChat.id, avatar, handle, targetId });
      }
    } catch ({ message }) {
      tryAgainLaterNotification();
      crashlytics.recordCustomError(Errors.INITIALIZE_CHAT, message);
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