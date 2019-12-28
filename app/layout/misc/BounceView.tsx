// @ts-nocheck
import React, { Component } from 'react';
import { Animated, PanResponder, View } from 'react-native';

const truthy = () => true;
const noop = () => { };

class BounceView extends Component {

  static defaultProps = {
    onPress: noop,
    scale: 1.1, // Max scale of animation
    moveSlop: 15, // Slop area for press
    delay: 40 // Animation delay in milliseconds
  };

  state = {
    scale: new Animated.Value(1)
  };

  UNSAFE_componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: truthy,
      onStartShouldSetPanResponderCapture: truthy,
      onMoveShouldSetPanResponder: truthy,
      onMoveShouldSetPanResponderCapture: truthy,
      onPanResponderTerminationRequest: truthy,
      onPanResponderTerminate: noop,
      onPanResponderGrant: () => {
        Animated.timing(this.state.scale, {
          toValue: this.props.scale,
          friction: 1,
          duration: 200,
          useNativeDriver: true
        }).start();
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { moveSlop, delay, onPress } = this.props;

        const isOutOfRange = gestureState.dy > moveSlop || gestureState.dy < (-moveSlop) || gestureState.dx > moveSlop || gestureState.dx < (-moveSlop);

        if (!isOutOfRange) {
          setTimeout(() => {
            Animated.spring(this.state.scale, {
              toValue: 1,
              friction: 1,
              duration: 200,
              useNativeDriver: true
            }).start();
            onPress(evt);
          }, delay);
        }
      }
    });
  };

  render() {
    const { scale } = this.state;
    const { children, style, ...rest } = this.props;

    return (
      <Animated.View
        style={[{
          transform: [{ scale }]
        }, style]} {...rest}>
        <View {...this.panResponder.panHandlers}>
          {children}
        </View>
      </Animated.View>
    );
  };
};

export default BounceView;