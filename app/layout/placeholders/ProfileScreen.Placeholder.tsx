import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';
import PlaceholderAnimation from './PlaceholderAnimation';
import { AppContext } from '@app/context';
import { PostDimensions } from '@app/constants';

interface ProfileScreenPlaceholderProps {
  viewMode?: boolean
};

const ProfileScreenPlaceholder: React.FC<ProfileScreenPlaceholderProps> = ({ viewMode }) => {
  const { theme } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Placeholder Animation={PlaceholderAnimation}>
        <View style={styles.avatarPlaceholder}>
          <PlaceholderLine
            noMargin
            color={theme.placeholder}
            style={styles.connectionsPlaceholder}
            width={24}
            height={40}
          />
          <PlaceholderMedia color={theme.placeholder} size={120} isRound />
          <PlaceholderLine
            noMargin
            color={theme.placeholder}
            style={styles.connectionsPlaceholder}
            width={24}
            height={40}
          />
        </View>

        <View style={styles.infoPlaceholder}>
          <PlaceholderLine
            noMargin
            color={theme.placeholder}
            style={styles.namePlaceholder}
            width={70}
            height={20}
          />
          <PlaceholderLine
            noMargin
            color={theme.placeholder}
            style={styles.handlePlaceholder}
            width={50}
            height={16}
          />
          {viewMode &&
            <View style={styles.interact}>
              <PlaceholderLine
                noMargin
                color={theme.placeholder}
                style={styles.interaction}
                width={48}
                height={32}
              />
              <PlaceholderLine
                noMargin
                color={theme.placeholder}
                style={styles.interaction}
                width={48}
                height={32}
              />
            </View>}
          <PlaceholderLine
            noMargin
            color={theme.placeholder}
            style={styles.aboutPlaceholder}
            width={100}
            height={110}
          />
        </View>
        {new Array(4)
          .fill({})
          .map((_, index) =>
            <View key={index} style={styles.postContainer}>
              <PlaceholderLine
                noMargin
                color={theme.placeholder}
                style={[styles.postPlaceholder, { marginRight: 10 }]}
                width={48}
                height={PostDimensions.Medium.height}
              />
              <PlaceholderLine
                noMargin
                color={theme.placeholder}
                style={styles.postPlaceholder}
                width={48}
                height={PostDimensions.Medium.height}
              />
            </View>
          )}
      </Placeholder>
    </View>
  );
};

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
    marginBottom: 4,
    borderRadius: 10
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  postPlaceholder: {
    borderRadius: 5
  }
});

export default ProfileScreenPlaceholder;