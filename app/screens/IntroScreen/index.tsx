import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialColors, Typography } from '../../theme';

const IntroScreen = () => {

  const { FontWeights, FontSizes } = Typography;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <View style={styles.headerContainer}>
          <Text style={{ ...FontWeights.Bold, ...FontSizes.Heading, marginTop: 20 }}>Charlotte Jefferson</Text>
          <Text style={{ ...FontWeights.Bold, ...FontSizes.SubHeading, }}>Charlotte Jefferson</Text>
          <Text style={{ ...FontWeights.Bold, ...FontSizes.Body, }}>Charlotte Jefferson</Text>
          <Text style={{ ...FontWeights.Bold, ...FontSizes.Caption, }}>Charlotte Jefferson</Text>

          <Text style={{ ...FontWeights.Regular, ...FontSizes.Heading, marginTop: 20 }}>Charlotte Jefferson</Text>
          <Text style={{ ...FontWeights.Regular, ...FontSizes.SubHeading, }}>Charlotte Jefferson</Text>
          <Text style={{ ...FontWeights.Regular, ...FontSizes.Body, }}>Charlotte Jefferson</Text>
          <Text style={{ ...FontWeights.Regular, ...FontSizes.Caption, }}>Charlotte Jefferson</Text>

          <Text style={{ ...FontWeights.Light, ...FontSizes.Heading, marginTop: 20 }}>Charlotte Jefferson</Text>
          <Text style={{ ...FontWeights.Light, ...FontSizes.SubHeading, }}>Charlotte Jefferson</Text>
          <Text style={{ ...FontWeights.Light, ...FontSizes.Body, }}>Charlotte Jefferson</Text>
          <Text style={{ ...FontWeights.Light, ...FontSizes.Caption, }}>Charlotte Jefferson</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainer: {
    marginLeft: 10
  },
  logo: {
    height: 64,
    width: 64
  },
  heading: {
    fontSize: 24,

  },
  body: {
    color: MaterialColors.grey[600],
    fontSize: 16,
  },
  item: {
    marginTop: 10,
    fontSize: 16
  }
});

export default IntroScreen;