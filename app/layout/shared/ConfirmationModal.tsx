import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Typography } from '@app/theme';
import { AppContext } from '@app/context';
import { ThemeColors } from '@app/types/theme';
import Button from '../controls/Button';

const { FontWeights, FontSizes } = Typography;

interface ConfirmationModalModal {
  title: string,
  description: string,
  isVisible: boolean,
  toggle: () => void,
  label: string,
  color?: string,
  onConfirm: () => void
};

const ConfirmationModal: React.FC<ConfirmationModalModal> = ({ title, description, isVisible, toggle, label, color, onConfirm }) => {

  const { theme } = useContext(AppContext);

  return (
    <Modal
      useNativeDriver
      animationInTiming={400}
      animationOutTiming={400}
      hideModalContentWhileAnimating
      isVisible={isVisible}
      animationIn='fadeIn'
      animationOut='fadeOut'
      onBackdropPress={toggle}>
      <View style={styles(theme).container}>
        <Text style={styles(theme).heading}>{title}</Text>
        <Text style={styles(theme).subHeading}>{description}</Text>
        <Button
          label={label}
          onPress={onConfirm}
          loading={false}
          containerStyle={[styles().confirm, { backgroundColor: color || theme.accent, }]}
        />
        <Button
          label='Cancel'
          onPress={toggle}
          loading={false}
          labelStyle={{ color: theme.text02 }}
          containerStyle={[styles().cancel, { backgroundColor: theme.base }]}
        />
      </View>
    </Modal>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: theme.base
  },
  heading: {
    ...FontWeights.Regular,
    ...FontSizes.Label,
    color: theme.text01
  },
  subHeading: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    marginTop: 10,
    color: theme.text02
  },
  confirm: { marginTop: 40 },
  cancel: { marginTop: 10 }
});

export default ConfirmationModal;