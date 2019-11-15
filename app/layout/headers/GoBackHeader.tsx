import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '../../theme';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeColors } from '../../types';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from 'react-navigation-hooks';

const { FontWeights, FontSizes, IconSizes } = Typography;

interface GoBackHeaderType {
  title?: string
};

const GoBackHeader: React.FC<GoBackHeaderType> = ({ title }) => {

  const { theme } = useContext(ThemeContext);
  const { goBack } = useNavigation();
  const navigateBack = () => goBack();
  return (
    <View style={styles(theme).container}>
      <Entypo onPress={navigateBack} name='chevron-thin-left' size={IconSizes.x6} color={theme.text01} />
      <Text style={styles(theme).title}>{title}</Text>
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  title: {
    ...FontWeights.Bold,
    ...FontSizes.SubHeading,
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