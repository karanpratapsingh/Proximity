import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Modalize from 'react-native-modalize';
import { AppContext } from '../../../context';
import { BottomSheetHeader } from '../../../layout';
import { ThemeColors } from '../../../types';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface SettingsBottomSheetType {
  ref: React.Ref<any>
};

const SettingsBottomSheet: React.FC<SettingsBottomSheetType> = React.forwardRef((props, ref) => {

  const { userId, theme } = useContext(AppContext);

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{
        showsVerticalScrollIndicator: false
      }}
      modalStyle={styles().container}
      adjustToContentHeight>
      <BottomSheetHeader
        heading='Settings'
        subHeading='Themes and options'
      />
      <View style={styles().content}>
        {/* <TouchableOpacity onPress={() => null}>

        </TouchableOpacity> */}
      </View>
    </Modalize>
  );
});

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    padding: 20
  },
  content: {
    flex: 1
  },

});

export default SettingsBottomSheet;