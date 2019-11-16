/**
 * Typography:
 * This contains all the typography config for the application
 * #Note: color and font size are defaulted as they can be overridden
 *        as required.
 */

const FontWeights = {
  Bold: {
    fontFamily: 'SFProDisplay-Bold',
    color: '#000'
  },
  Regular: {
    fontFamily: 'SFProDisplay-Regular',
    color: '#000'
  },
  Light: {
    fontFamily: 'SFProDisplay-Light',
    color: '#000'
  }
};

const FontSizes = {
  Heading: {
    fontSize: 32
  },
  SubHeading: {
    fontSize: 24
  },
  Body: {
    fontSize: 16
  },
  Caption: {
    fontSize: 14
  }
};

const IconSizes = {
  x0: 6,
  x1: 10,
  x2: 12,
  x3: 14,
  x4: 16,
  x5: 20,
  x6: 24,
  x7: 28,
  x8: 32,
  x9: 40,
};

const Typography = { FontWeights, FontSizes, IconSizes };

export default Typography;
