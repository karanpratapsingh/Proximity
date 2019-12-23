import React, { useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { IconSizes } from '../../../constants';
import { ThemeStatic } from '../../../theme';

const AnimationValues = {
  opacity: { initial: 0, final: 1 },
  bounce: { initial: 0.4, final: 1 }
};

interface LikeBounceAnimationProps {
  ref: React.Ref<any>
};

const LikeBounceAnimation: React.FC<LikeBounceAnimationProps> = React.forwardRef((_, ref) => {

  const [likeOpacity] = useState(new Animated.Value(AnimationValues.opacity.initial));
  const [likeBounce] = useState(new Animated.Value(AnimationValues.bounce.initial));

  // @ts-ignore
  ref.current = {
    animate: () => {
      const opacityConfig = {
        duration: 250,
        useNativeDriver: true
      };

      const fadeInConfig = {
        toValue: AnimationValues.opacity.final,
        ...opacityConfig
      };

      const fadeOutConfig = {
        toValue: AnimationValues.opacity.initial,
        ...opacityConfig
      };

      const springConfig = {
        toValue: AnimationValues.bounce.final,
        friction: 2,
        useNativeDriver: true
      };

      Animated.parallel([
        Animated.spring(likeBounce, springConfig),
        Animated.timing(likeOpacity, fadeInConfig)
      ]).start(() => {
        Animated.timing(likeOpacity, fadeOutConfig)
          .start(() => likeBounce.setValue(AnimationValues.bounce.initial));
      });
    }
  };

  return (
    <Animated.View style={[styles.container, {
      opacity: likeOpacity,
      transform: [{ scale: likeBounce }]
    }]}>
      <AntDesign
        name='heart'
        color={ThemeStatic.white}
        size={IconSizes.x12}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    top: responsiveHeight(18),
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LikeBounceAnimation;