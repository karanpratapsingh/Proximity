import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { Routes, PostDimensions } from '@app/constants';
import { NativeImage } from '@app/layout';
import { AppContext } from '@app/context';
import { ThemeColors } from '@app/types/theme';
import { ExplorePost } from '@app/types/screens';

interface ExplorePostCardProps {
  postId: string,
  uri: string,
  large?: boolean
  style?: StyleProp<ViewStyle>
};

const ExplorePostCard: React.FC<ExplorePostCardProps> = ({ postId, uri, large, style }): React.ReactElement => {

  const { theme } = useContext(AppContext);
  const { navigate } = useNavigation();

  const navigateToPost = () => {
    navigate(Routes.PostViewScreen, { postId });
  };

  const containerStyle = large ? { height: '100%', width: '100%' } : {};

  return (
    <TouchableOpacity onPress={navigateToPost} activeOpacity={0.95} style={[styles().container, style, containerStyle]}>
      <NativeImage uri={uri} style={styles(theme).postImage} />
    </TouchableOpacity>
  );
};

export const PrimaryImageGroup = ({ imageGroup }: { imageGroup: ExplorePost[] }): React.ReactElement => (
  <View style={styles().gridImageGroup}>
    {
      imageGroup.map(({ id: postId, uri }) => (
        <ExplorePostCard
          key={postId}
          postId={postId}
          uri={uri}
        />
      ))
    }
  </View>
);

type SecondaryImageGroupProps = {
  imageGroup: ExplorePost[];
  reversed: boolean;
};

export const SecondaryImageGroup: React.FC<SecondaryImageGroupProps> = ({ imageGroup, reversed }): React.ReactElement => {
  const leftColumns = imageGroup.slice(0, 2);
  const rightColumn = imageGroup.slice(2, 3);

  const reverseDirection: ViewStyle = reversed ? { flexDirection: 'row-reverse' } : {};
  const reverseMargin: ViewStyle = reversed ? { alignItems: 'flex-end', marginLeft: 2 } : { marginRight: 2 };

  return (
    <View style={[styles().gridImageGroup, reverseDirection]}>
      <View style={[styles().secondaryLeftColumn, reverseMargin]}>
        {
          leftColumns.map(({ id: postId, uri }, index) => {
            const style = index ? { marginTop: 5 } : {};
            return (
              <ExplorePostCard
                key={postId}
                postId={postId}
                uri={uri}
                style={style}
              />
            )
          })
        }
      </View>
      <View style={styles().secondaryRightColumn}>
        {
          rightColumn.map(({ id: postId, uri }) => (
            <ExplorePostCard
              large
              key={postId}
              postId={postId}
              uri={uri}
            />
          ))
        }
      </View>
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    ...PostDimensions.Small,
    overflow: 'hidden',
    borderRadius: 4
  },
  postImage: {
    flex: 1,
    backgroundColor: theme.placeholder
  },
  gridImageGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  secondaryLeftColumn: {
    flex: 1
  },
  secondaryRightColumn: {
    flex: 2
  },
});

export default ExplorePostCard;