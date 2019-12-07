import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Modalize from 'react-native-modalize';
import { AppContext } from '../../../context';
import { BottomSheetHeader, SvgBanner, NativeImage } from '../../../layout';
import { Typography } from '../../../theme';
import { ThemeColors } from '../../../types/theme';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import Config from '../../../config';
import ProximityLogo from '../../../../assets/svg/proximity-logo.svg';

const { FontWeights, FontSizes } = Typography;

interface AboutBottomSheetProps {
  ref: React.Ref<any>
};

const AboutBottomSheet: React.FC<AboutBottomSheetProps> = React.forwardRef((_, ref) => {

  const { theme } = useContext(AppContext);

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles(theme).container}
      adjustToContentHeight={false}>
      <BottomSheetHeader
        heading='About'
        subHeading='About Proximity'
      />
      <View style={styles().content}>
        <Image source={require('../../../../assets/images/proximity-logo.png')} style={styles().logoImage} />
        <Text style={styles(theme).versionText}>{Config.version}</Text>
        <Text style={styles(theme).aboutText}>
          Proximity is an Open Source social media app I designed and
          developed in my free time, this app is fully open source and
          doesn't use your data against you in any shape or form. The
          code for the mobile is fully open source on github.
        </Text>
        <Text style={styles(theme).aboutText}>
          Curious how I build this? which tech stack I used? feel free
          to leave me message, I'm always excited to talk about new 
          technologies with new people
        </Text>
        
      </View>
    </Modalize>
  );
});

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.base,
    marginTop: 20
  },
  content: {
    flex: 1,
    paddingTop: 10,
    marginBottom: responsiveHeight(10)
  },
  logoImage: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center'
  },
  versionText: {
    ...FontWeights.Light,
    ...FontSizes.Label,
    alignSelf: 'center',
    color: theme.text02
  },
  aboutText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    marginVertical: 20,
    alignSelf: 'center',
    textAlign: 'justify',
    color: theme.text01
  }
});

export default AboutBottomSheet;