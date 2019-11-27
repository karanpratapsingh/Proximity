import React from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';

const PostViewScreenPlaceholder = () => (
  <View style={styles.container}>
    <Placeholder Animation={Fade}>
      <View style={styles.postHeader}>
        <PlaceholderMedia size={50} isRound />
        <View style={styles.author}>
          <PlaceholderLine noMargin width={responsiveWidth(20)} style={styles.handlePlaceholder} />
          <PlaceholderLine noMargin width={responsiveWidth(10)} style={styles.timePlaceholder} />
        </View>
      </View>
      <PlaceholderLine
        noMargin
        height={400}
        style={styles.card}
      />
      <PlaceholderLine noMargin width={responsiveWidth(5)} style={styles.likesPlaceholder} />
      <PlaceholderLine noMargin width={responsiveWidth(26)} style={styles.captionPlaceholder} />
    </Placeholder>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 2
  },
  postHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 500
  },
  author: {
    justifyContent: 'center',
    width: responsiveWidth(50)
  },
  handlePlaceholder: {
    marginLeft: 12,
    borderRadius: 10
  },
  timePlaceholder: {
    marginTop: 10,
    marginLeft: 12,
    borderRadius: 10
  },
  card: {
    marginTop: 25,
    borderRadius: 10
  },
  likesPlaceholder: {
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 10
  },
  captionPlaceholder: {
    marginTop: 5,
    borderRadius: 10
  }
});

export default PostViewScreenPlaceholder;