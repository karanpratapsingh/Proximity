import React, { useContext } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Composer } from 'react-native-gifted-chat';
import { AppContext } from '@app/context';
import { Typography } from '@app/theme';
import { ThemeColors } from '@app/types/theme';

const { FontWeights, FontSizes } = Typography;

const CustomComposer: React.FC = composerProps => {
  const { theme } = useContext(AppContext);
  return (
    <Composer
      {...composerProps}
      multiline
      textInputStyle={styles(theme).inputStyle}
    />
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  inputStyle: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: theme.text01,
    paddingTop: 10,
    paddingLeft: 10
  }
});

export default CustomComposer;