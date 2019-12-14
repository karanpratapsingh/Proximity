import React, { useContext } from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import Modalize from 'react-native-modalize';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Config from '../../../config';
import { AppContext } from '../../../context';
import { BottomSheetHeader, Button } from '../../../layout';
import { ThemeStatic, Typography } from '../../../theme';
import { ThemeColors } from '../../../types/theme';

const { FontWeights, FontSizes } = Typography;
const { author: { url }, repository, version } = Config;

interface PostOptionsBottomSheetProps {
  ref: React.Ref<any>
};

const PostOptionsBottomSheet: React.FC<PostOptionsBottomSheetProps> = React.forwardRef((_, ref) => {

  const { theme } = useContext(AppContext);

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles(theme).container}
      adjustToContentHeight>
      <View style={styles().content}>
        <Text>WHDDUP</Text>
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
    paddingTop: 10,
    marginBottom: responsiveHeight(10)
  }
});

export default PostOptionsBottomSheet;