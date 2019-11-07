import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Fade, Placeholder, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';
import { generateUUID } from '../../utils';

const MessageScreenPlaceholder: React.FC = () => (
  <View style={styles.container}>
    <Placeholder Animation={Fade}>
      {new Array(20)
        .fill(generateUUID())
        .map(placeholderKey =>
          <View key={placeholderKey} style={styles.cardContainer}>
            <PlaceholderMedia size={50} isRound />
            <View style={styles.infoContainer}>
              <PlaceholderLine
                noMargin
                style={styles.notificationCardPlaceholder}
                height={14}
                width={'40%' as any}
              />
              <PlaceholderLine
                noMargin
                style={styles.notificationCardPlaceholder}
                height={10}
                width={'60%' as any}
              />
            </View>
          </View>
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
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10
  },
  notificationCardPlaceholder: {
    borderRadius: 2,
    marginTop: 10
  }
});

export default MessageScreenPlaceholder;