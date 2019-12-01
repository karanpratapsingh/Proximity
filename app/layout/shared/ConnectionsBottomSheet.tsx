import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Modalize from 'react-native-modalize';
import { useNavigation } from 'react-navigation-hooks';
import { AppContext } from '../../context';
import { BottomSheetHeader, ConnectionsPlaceholder } from '..';
import { Typography } from '../../theme';
import { ThemeColors } from '../../types';

const { FontWeights, FontSizes } = Typography;

interface ConnectionsBottomSheetProps {
  ref: React.Ref<any>,
  userId: string,
  type: string
};

const ConnectionsBottomSheet: React.FC<ConnectionsBottomSheetProps> = React.forwardRef(({ userId, type }, ref) => {

  const { toggleTheme, theme, themeType } = useContext(AppContext);
  const { navigate } = useNavigation();

  let subHeading;

  if (type === 'Following') {
    subHeading = 'People you follow'
  } else if (type === 'Followers') {
    subHeading = 'People following you'
  }

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles(theme).container}>
      <BottomSheetHeader
        heading={type}
        subHeading={subHeading}
      />
      <View style={styles(theme).content}>
        <ConnectionsPlaceholder />
      </View>
    </Modalize>
  );
});

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    backgroundColor: theme.base
  },
  content: {
    flex: 1,
    paddingTop: 20
  },
});

export default ConnectionsBottomSheet;