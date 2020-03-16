import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Checkbox from 'react-native-modest-checkbox';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'react-navigation-hooks';
import { IconSizes, Routes } from '@app/constants';
import { AppContext } from '@app/context';
import { BottomSheetHeader, Option } from '@app/layout';
import { ThemeStatic, ThemeVariant, Typography } from '@app/theme';
import { ThemeColors } from '@app/types/theme';
import { signOut } from '@app/utils/authentication';

const { FontWeights, FontSizes } = Typography;

interface SettingsBottomSheetProps {
  ref: React.Ref<any>,
  onBlockListPress: () => void,
  onAboutPress: () => void
};

const SettingsBottomSheet: React.FC<SettingsBottomSheetProps> = React.forwardRef(({ onBlockListPress, onAboutPress }, ref) => {

  const { toggleTheme, theme, themeType } = useContext(AppContext);
  const { navigate } = useNavigation();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(themeType === ThemeVariant.dark);
  }, []);

  const onChange = ({ checked }) => {
    if (checked) toggleTheme(ThemeVariant.dark);
    else toggleTheme(ThemeVariant.light);
    setIsChecked(checked);
  };

  const logOut = async () => {
    await signOut();
    navigate(Routes.Auth);
  };

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles(theme).container}
      adjustToContentHeight>
      <BottomSheetHeader
        heading='Settings'
        subHeading='Themes and options'
      />
      <View style={styles().content}>
        <Option
          label='Blocked users'
          iconName='ios-list'
          onPress={onBlockListPress}
        />
        <Option iconName='ios-color-palette'>
          <Checkbox
            labelBefore
            checked={isChecked}
            label='Dark Mode'
            onChange={onChange}
            labelStyle={styles(theme).label}
            checkedComponent={<MaterialIcons name='done' size={IconSizes.x6} color={ThemeStatic.accent} />}
            uncheckedComponent={<MaterialIcons name='done' size={IconSizes.x6} color={ThemeStatic.text02} />}
          />
        </Option>
        <Option
          label='About'
          iconName='ios-information-circle-outline'
          onPress={onAboutPress}
        />
        <Option
          label='Logout'
          iconName='ios-log-out'
          onPress={logOut}
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
    flex: 1,
    paddingTop: 20
  },
  label: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    width: responsiveWidth(74),
    color: theme.text01
  }
});

export default SettingsBottomSheet;