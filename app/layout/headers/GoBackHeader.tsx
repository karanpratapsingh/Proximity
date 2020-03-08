import React, { useContext } from 'react';
import { StyleSheet, Text, View, StyleProp, TextProps, TextStyle } from 'react-native';
import { Typography } from '@app/theme';
import { AppContext } from '@app/context';
import { ThemeColors } from '@app/types/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from 'react-navigation-hooks';

const { FontWeights, FontSizes } = Typography;

interface GoBackHeaderProps {
  title?: string,
  onTitlePress?: () => void,
  ContentLeft?: React.FC,
  IconRight?: React.FC,
  iconSize: number,
  titleStyle?: StyleProp<TextStyle>
};

const GoBackHeader: React.FC<GoBackHeaderProps> = ({ title, onTitlePress, ContentLeft, IconRight, iconSize, titleStyle }) => {

  const { theme } = useContext(AppContext);
  const { goBack } = useNavigation();
  const navigateBack = () => goBack();

  return (
    <View style={styles(theme).container}>
      <Entypo onPress={navigateBack} name='chevron-thin-left' size={iconSize} color={theme.text01} />
      {ContentLeft && <ContentLeft />}
      {title && <Text onPress={onTitlePress} style={[styles(theme).title, titleStyle]}>{title}</Text>}
      {IconRight && <IconRight />}
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  title: {
    ...FontWeights.Bold,
    ...FontSizes.Label,
    color: theme.text01,
    marginLeft: 20
  },
  underline: {
    marginTop: 16,
    height: 2,
    width: 20,
    borderRadius: 10,
    backgroundColor: theme.text01
  }
});

export default GoBackHeader;