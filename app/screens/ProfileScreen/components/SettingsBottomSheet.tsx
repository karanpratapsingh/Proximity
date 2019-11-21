import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modalize from 'react-native-modalize';
import { AppContext } from '../../../context';
import { BottomSheetHeader } from '../../../layout';
import { ThemeColors } from '../../../types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Checkbox from 'react-native-modest-checkbox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeStatic, Typography } from '../../../theme';

const { FontWeights, FontSizes } = Typography;

interface SettingsBottomSheetType {
  ref: React.Ref<any>
};

const SettingsBottomSheet: React.FC<SettingsBottomSheetType> = React.forwardRef((props, ref) => {

  const { userId, toggleTheme, theme } = useContext(AppContext);

  const [isChecked, setIsChecked] = useState(false);

  const onChange = ({ checked }) => {

    if (checked) {
      toggleTheme('dark');
    } else {
      toggleTheme('light');
    }

    setIsChecked(checked);
  };

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{
        showsVerticalScrollIndicator: false
      }}
      modalStyle={styles(theme).container}
      adjustToContentHeight>
      <BottomSheetHeader
        heading='Settings'
        subHeading='Themes and options'
      />
      <View style={styles().content}>
        <Checkbox
          labelBefore
          checked={isChecked}
          label='Dark Mode'
          onChange={onChange}
          labelStyle={styles(theme).label}
          checkedComponent={<MaterialIcons name='done' size={25} color={ThemeStatic.accent} />}
          uncheckedComponent={<MaterialIcons name='done' size={25} color={ThemeStatic.text02} />}
        />
      </View>
    </Modalize>
  );
});

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.base
  },
  content: {
    flex: 1
  },
  label: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: theme.text01
  }
});

export default SettingsBottomSheet;