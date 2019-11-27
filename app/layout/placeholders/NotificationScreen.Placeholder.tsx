import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Fade, Placeholder, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';
import { generateUUID } from '../../utils';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const NotificationScreenPlaceholder: React.FC = () => (
  <View style={styles.container}>
    <Placeholder Animation={Fade}>
      {new Array(20)
        .fill({})
        .map((_, index) =>
          <View key={index} style={styles.cardContainer}>
            <PlaceholderMedia size={50} isRound />
            <View style={styles.infoContainer}>
              <PlaceholderLine
                noMargin
                style={styles.notificationCardPlaceholder}
                width={responsiveWidth(25)}
              />
              <PlaceholderLine
                noMargin
                style={styles.notificationCardPlaceholder}
                width={responsiveWidth(10)}
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
    marginBottom: 10
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10
  },
  notificationCardPlaceholder: {
    borderRadius: 10,
    marginTop: 10
  }
});

export default NotificationScreenPlaceholder;