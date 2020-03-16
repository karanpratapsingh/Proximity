import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { AppContext } from '@app/context';
import { BottomSheetHeader } from '@app/layout';
import { Typography } from '@app/theme';
import { ThemeColors } from '@app/types/theme';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const { FontWeights, FontSizes } = Typography;

interface TermsAndConditionsBottomSheetProps {
  ref: React.Ref<any>
};

const TermsAndConditionsBottomSheet: React.FC<TermsAndConditionsBottomSheetProps> = React.forwardRef((_, ref) => {

  const { theme } = useContext(AppContext);

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles(theme).container}
      adjustToContentHeight={false}>
      <BottomSheetHeader
        heading='Terms and conditions'
        subHeading='Kindly review them carefully'
      />
      <View style={styles().content}>

        <Text style={styles(theme).termsTitleText}>Acceptance of Terms</Text>
        <Text style={styles(theme).termsText}>
          BY USING THE SERVICES, YOU ARE AGREEING, ON BEHALF OF YOURSELF AND THOSE
          YOU REPRESENT, TO COMPLY WITH AND BE LEGALLY BOUND BY THESE TERMS AS WELL
          AS OUR PRIVACY POLICY AND ALL APPLICABLE LAWS. IF YOU, FOR YOURSELF OR ON
          BEHALF OF THOSE YOU REPRESENT, DO NOT AGREE TO ANY PROVISION OF THESE TERMS,
          YOU MUST, FOR YOURSELF AND ON BEHALF ANY SUCH PERSON(S), DISCONTINUE THE
          REGISTRATION PROCESS.
        </Text>

        <Text style={styles(theme).termsTitleText}>Modification of Terms</Text>
        <Text style={styles(theme).termsText}>
          Proximity (“Proximity”, “we”, “us” or “our”) provides a free and open source
          platform via its apps to a community of registered users (“users” or “you”) to engage
          in a variety of activities, including to upload and display photographs
          (“Visual Content”), share comments, opinions, and ideas, promote Visual
          Content The foregoing list of Services is not all-inclusive and additional
          Services may be offered by us from time to time. The following are the
          terms of use (“Terms”) for using the Site and the Services.
        </Text>

        <Text style={styles(theme).termsTitleText}>Data Usage</Text>
        <Text style={styles(theme).termsText}>
          As mentioned Proximity is an open source app with it's source code
          hosted on github, the data you generate is not used against you
          in any shape or form like sharing with 3rd parties or targeting
          you for ads using machine learning algorithms
        </Text>

        <Text style={styles(theme).termsTitleText}>Registration</Text>
        <Text style={styles(theme).termsText}>
          Services are available to authorized representatives of legal entities and
          to individuals who are either (i) at least 18 years old to register for
          Proximity, or (ii) at least 14 years old, and who are authorized to access
          the Site by a parent or legal guardian. If you have authorized a minor to
          use the Site, you are responsible for the online conduct of such minor,
          and the consequences of any misuse of the Site by the minor. Parents
          and legal guardians are warned that the Site does display Visual
          Content containing nudity and violence that may be offensive to some.
        </Text>

        <Text style={styles(theme).termsTitleText}>User Conduct</Text>
        <Text style={styles(theme).termsText}>
          All Visual Content posted or otherwise submitted to the Site, and any
          comments, or other communications (“Communications”, with Visual Content
          and Communications collectively referred to as “Content”) is the sole
          responsibility of the account holder from which such Communications
          originate. You acknowledge and agree that you, and not Proximity, are
          entirely responsible for all Content that you post, or otherwise submit
          to the Site, including via messages exchanged through Proximity’s
          messenger service. Proximity does not control user submitted Content
          and, as such, does not guarantee the accuracy, integrity, or quality
          of such Content. You understand that by using the Platform, you may be
          exposed to Content that is offensive, indecent, or objectionable.
        </Text>
        <Text style={styles(theme).termsText}>
          As a condition of use, you promise to abide by our Content Guidelines
          and not to use the Services for any purpose that is unlawful or prohibited
          by these Terms, or any other purpose not reasonably intended by Proximity.
          By way of example, and not as a limitation, you agree not to use the
          Services:
        </Text>
        <Text style={styles(theme).subPoints}>
          1) To abuse, harass, threaten, impersonate, or intimidate any person.
        </Text>
        <Text style={styles(theme).subPoints}>
          2) To post or transmit, or cause to be posted or transmitted, any Content that is libelous, defamatory, obscene, pornographic, abusive, offensive, profane, or that infringes any copyright or other right of any person.
        </Text>
        <Text style={styles(theme).subPoints}>
          3) To communicate with Proximity’s representatives or other users in an abusive or offensive manner.
        </Text>
        <Text style={styles(theme).subPoints}>
          4) For any purpose (including posting or viewing Content) that is not permitted under the laws of the jurisdiction where you use the Services.
        </Text>
        <Text style={styles(theme).subPoints}>
          5) To post or transmit, or cause to be posted or transmitted, any Communication designed or intended to obtain password, account, or private information from any Proximity user.
        </Text>
        <Text style={styles(theme).subPoints}>
          6) To create or transmit unwanted ‘spam’ to any person or any URL.
        </Text>
        <Text style={styles(theme).subPoints}>
          7) To create multiple accounts for the purpose of voting for users’ Visual Content.
        </Text>
        <Text style={styles(theme).subPoints}>
          8) To post copyrighted Content that does not belong to you, unless you are commenting on Visual Content in Blogs, where you may post such Content subject to providing appropriate attribution to the copyright owner and a link to the source of the Content.
        </Text>
        <Text style={styles(theme).subPoints}>
          9) You agree not to use any robot, spider, scraper, or other automated means to access the Platform for any purpose without our express written permission. Additionally, you agree that you will not take any action that imposes, or may impose in our sole discretion an unreasonable or disproportionately large load on our infrastructure, interfere or attempt to interfere with the proper working of the Platform or any activities conducted on the Site or bypass any measures we may use to prevent or restrict access to the Site.
        </Text>
        <Text style={styles(theme).subPoints}>
          10) To artificially inﬂate or alter vote counts, blog counts, comments, or any other Service or for the purpose of giving or receiving money or other compensation in exchange for votes and/or in an attempt to alter the result of any contest or promotion, or for participating in any other organized effort that in any way artificially alters the results of Services.
        </Text>
        <Text style={styles(theme).subPoints}>
          11) To advertise to, or solicit, any user to buy or sell any third party products or services, or to use any information obtained from the Services in order to contact, advertise to, solicit, or sell to any user without their prior explicit consent.
        </Text>
        <Text style={styles(theme).subPoints}>
          12) To promote or sell Visual Content of another person unless you are expressly authorized to do so.
        </Text>
        <Text style={styles(theme).subPoints}>
          13) To sell, assign, or otherwise transfer your Profile or account.
        </Text>
        <Text style={styles(theme).subPoints}>
          14) To promote drugs, firearms in any manner. Violation of this guideline will lead to a permanent ban effective immediately from the platform.
        </Text>
        <Text style={styles(theme).termsText}>
          You are solely responsible for your interactions with other users of the Site.
          Proximity reserves the right, but has no obligation, to review disputes between
          you and other users. This includes the right to review messages exchanged through
          Proximity’s messenger service, based on any reports that Proximity receives alleging
          the violation of these Terms through the use of Proximity’s messenger service, including
          without limitation, reports regarding alleged harassment, indecency, and offensive messages.
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
  termsTitleText: {
    ...FontWeights.Regular,
    ...FontSizes.Label,
    marginVertical: 10,
    color: theme.text01
  },
  termsText: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    marginBottom: 10,
    textAlign: 'justify',
    color: theme.text01
  },
  subPoints: {
    ...FontWeights.Regular,
    ...FontSizes.Body,
    marginBottom: 10,
    textAlign: 'justify',
    color: theme.text01
  }
});

export default TermsAndConditionsBottomSheet;