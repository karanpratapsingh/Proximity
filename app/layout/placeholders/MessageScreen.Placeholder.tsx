import React from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';
import PlaceholderAnimation from './PlaceholderAnimation';

const MessageScreenPlaceholder: React.FC = () => (
  <View style={styles.container}>
    <Placeholder Animation={PlaceholderAnimation}>
      {new Array(20)
        .fill({})
        .map((_, index) =>
          <View key={index} style={styles.cardContainer}>
            <PlaceholderMedia size={50} isRound />
            <View style={styles.infoContainer}>
              <PlaceholderLine
                noMargin
                style={styles.userChatPlaceholder}
                width={responsiveWidth(10)}
              />
              <PlaceholderLine
                noMargin
                style={styles.userChatPlaceholder}
                width={responsiveWidth(20)}
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
  userChatPlaceholder: {
    borderRadius: 10,
    marginTop: 10
  }
});

export default MessageScreenPlaceholder;