import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { AppContext } from '@app/context';
import { BottomSheetHeader, Option } from '@app/layout';
import { ThemeColors } from '@app/types/theme';
import { postReportedNotification } from '@app/utils/notifications';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_REPORT_POST } from '@app/graphql/mutation';
import { ThemeStatic } from '@app/theme';

interface PostOptionsBottomSheetProps {
  ref: React.Ref<any>,
  authorId: string,
  postId: string,
  onPostEdit: () => void,
  onPostDelete: () => void
};

const PostOptionsBottomSheet: React.FC<PostOptionsBottomSheetProps> = React.forwardRef(({ authorId, postId, onPostEdit, onPostDelete }, ref) => {

  const { user, theme } = useContext(AppContext);
  const [reportPost] = useMutation(MUTATION_REPORT_POST, { variables: { postId } });
  const isOwnPost = user.id === authorId;

  const onPostReport = () => {
    reportPost();
    postReportedNotification();
    // @ts-ignore
    ref.current.close();
  };

  let subHeading = 'Tell us what you think';
  let content = (
    <Option
      label='Report'
      iconName='ios-flag'
      color={ThemeStatic.delete}
      onPress={onPostReport}
    />
  );

  if (isOwnPost) {
    subHeading = 'Manage your post'
    content = (
      <>
        <Option
          label='Edit'
          iconName='md-create'
          onPress={onPostEdit}
        />
        <Option
          label='Delete'
          iconName='md-trash'
          color={ThemeStatic.delete}
          onPress={onPostDelete}
        />
      </>
    );
  }

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles(theme).container}
      adjustToContentHeight>
      <BottomSheetHeader
        heading='Options'
        subHeading={subHeading}
      />
      <View style={styles().content}>
        {content}
      </View>
    </Modalize >
  );
});

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.base
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 16
  }
});

export default PostOptionsBottomSheet;