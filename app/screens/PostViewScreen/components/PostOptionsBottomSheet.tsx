import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Modalize from 'react-native-modalize';
import { AppContext } from '../../../context';
import { BottomSheetHeader, Option } from '../../../layout';
import { ThemeColors } from '../../../types/theme';
import { postReportedNotification } from '../../../utils/notifications';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_REPORT_POST } from '../../../graphql/mutation';

interface PostOptionsBottomSheetProps {
  ref: React.Ref<any>,
  postId: String
};

const PostOptionsBottomSheet: React.FC<PostOptionsBottomSheetProps> = React.forwardRef(({ postId }, ref) => {

  const { theme } = useContext(AppContext);
  const [reportPost] = useMutation(MUTATION_REPORT_POST, { variables: { postId } });

  const onPostReport = () => {
    reportPost();
    postReportedNotification();
    // @ts-ignore
    ref.current.close();
  };

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles(theme).container}
      adjustToContentHeight>
      <BottomSheetHeader
        heading='Actions'
        subHeading='Tell us what you think'
      />
      <View style={styles().content}>
        <Option
          label='Report'
          iconName='ios-flag'
          onPress={onPostReport}
        />
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
    paddingBottom: 20
  }
});

export default PostOptionsBottomSheet;