import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';

const ProfileScreenPlaceholder: React.FC = () => (
  <View style={styles.container}>
    <Placeholder Animation={Fade}>
      <View style={styles.avatarPlaceholder}>
        <PlaceholderLine style={styles.connectionsPlaceholder} noMargin width={24} height={40} />
        <PlaceholderMedia size={120} isRound />
        <PlaceholderLine style={styles.connectionsPlaceholder} noMargin width={24} height={40} />
      </View>
      <View style={styles.infoPlaceholder}>
        <PlaceholderLine style={styles.namePlaceholder} noMargin width={70} height={20} />
        <PlaceholderLine style={styles.handlePlaceholder} noMargin width={50} height={16} />
        <PlaceholderLine style={styles.aboutPlaceholder} noMargin width={100} height={110} />
      </View>
      <View style={styles.postContainer}>
        <PlaceholderLine style={styles.postPlaceholder} noMargin width={48.5} height={150} />
        <PlaceholderLine style={styles.postPlaceholder} noMargin width={48.5} height={150} />
      </View>
      <View style={[styles.postContainer, { marginTop: 10 }]}>
        <PlaceholderLine style={styles.postPlaceholder} noMargin width={48.5} height={150} />
        <PlaceholderLine style={styles.postPlaceholder} noMargin width={48.5} height={150} />
      </View>
    </Placeholder>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0
  },
  avatarPlaceholder: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  connectionsPlaceholder: {
    borderRadius: 5
  },
  infoPlaceholder: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  namePlaceholder: {
    borderRadius: 5
  },
  handlePlaceholder: {
    marginTop: 10,
    borderRadius: 5
  },
  aboutPlaceholder: {
    marginTop: 20,
    borderRadius: 5
  },
  postContainer: {
    marginTop: 10,
    flexDirection: 'row',    
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postPlaceholder: {
    borderRadius: 5
  }
});

export default ProfileScreenPlaceholder;