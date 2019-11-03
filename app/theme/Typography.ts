/**
 * Typography:
 * This contains all the typography config for the application
 * #Note: color and font size are defaulted as they can be overridden
 *        as required.
 */

const Typography = {
    Heading: {
        bold: {
            fontSize: 24,
            fontFamily: 'SFProDisplay-Bold',
            color: '#000'
        },
        semiBold: {
            fontSize: 24,
            fontFamily: 'SFProDisplay-SemiBold',
            color: '#000'
        }
    },
    Body: {
        regular: {
            fontSize: 20,
            fontFamily: 'SFProDisplay-Regular',
            color: '#000'
        },
        light: {
            fontSize: 16,
            fontFamily: 'SFProDisplay-Light',
            color: '#000'
        }
    },
    Caption: {
        thin: {
            fontSize: 12,
            fontFamily: 'SFProDisplay-Thin',
            color: '#000'
        }
    }
};

export default Typography;
