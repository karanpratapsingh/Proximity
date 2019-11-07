import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import { generateUUID } from '../../utils';

const ProfileScreenPlaceholder: React.FC = () => (
  <View style={styles.container}>
    <Placeholder Animation={Fade}>
      {new Array(10)
        .fill(generateUUID())
        .map(placeholderKey =>
          <PlaceholderLine
            key={placeholderKey}
            noMargin
            style={styles.notificationCardPlaceholder}
            height={60}
            width={'100%' as any}
          />
        )}
    </Placeholder>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0
  },
  notificationCardPlaceholder: {
    borderRadius: 5,
    marginTop: 10
  }
});

export default ProfileScreenPlaceholder;