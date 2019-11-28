import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';

interface ProfileScreenPlaceholderType {
  viewMode?: boolean
};

const ProfileScreenPlaceholder: React.FC<ProfileScreenPlaceholderType> = ({ viewMode }) => (
  <View style={styles.container}>
    <Placeholder Animation={props => <Fade {...props} />}>
      <View style={styles.avatarPlaceholder}>
        <PlaceholderLine style={styles.connectionsPlaceholder} noMargin width={24} height={40} />
        <PlaceholderMedia size={120} isRound />
        <PlaceholderLine style={styles.connectionsPlaceholder} noMargin width={24} height={40} />
      </View>

      <View style={styles.infoPlaceholder}>
        <PlaceholderLine style={styles.namePlaceholder} noMargin width={70} height={20} />
        <PlaceholderLine style={styles.handlePlaceholder} noMargin width={50} height={16} />
        {viewMode &&
          <View style={styles.interact}>
            <PlaceholderLine style={styles.interaction} noMargin width={48} height={32} />
            <PlaceholderLine style={styles.interaction} noMargin width={48} height={32} />
          </View>}
        <PlaceholderLine style={styles.aboutPlaceholder} noMargin width={100} height={110} />
      </View>
      {new Array(4)
        .fill({})
        .map((_, index) =>
          <View key={index} style={styles.postContainer}>
            <PlaceholderLine style={styles.postPlaceholder} noMargin width={48.5} height={150} />
            <PlaceholderLine style={styles.postPlaceholder} noMargin width={48.5} height={150} />
          </View>
        )}
    </Placeholder>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 0
  },
  avatarPlaceholder: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  connectionsPlaceholder: {
    borderRadius: 10
  },
  infoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  namePlaceholder: {
    borderRadius: 10
  },
  handlePlaceholder: {
    marginTop: 10,
    borderRadius: 10
  },
  interact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
  },
  interaction: {
    borderRadius: 50
  },
  aboutPlaceholder: {
    marginTop: 16,
    borderRadius: 10
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  postPlaceholder: {
    borderRadius: 10
  }
});

export default ProfileScreenPlaceholder;