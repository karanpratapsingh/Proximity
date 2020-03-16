import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconSizes } from '@app/constants';
import { AppContext } from '@app/context';
import { Typography } from '@app/theme';
import { ThemeColors } from '@app/types/theme';

const { FontWeights, FontSizes } = Typography;

interface OptionProps {
  label?: string,
  iconName: string,
  onPress?: () => void,
  children?: any,
  color?: string
};

const Option: React.FC<OptionProps> = ({ label, iconName, onPress, children, color }) => {
  const { theme } = useContext(AppContext);

  if (children)
    return (
      <View style={styles().container}>
        <Ionicons name={iconName} size={IconSizes.x5} color={color || theme.text01} />
        {children}
      </View>
    );

  return (
    <TouchableOpacity style={styles().container} activeOpacity={0.9} onPress={onPress}>
      <Ionicons name={iconName} size={IconSizes.x5} color={color || theme.text01} />
      <Text style={[styles(theme).label, { color: color || theme.text01 }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  label: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    marginLeft: 10
  }
});

export default Option;