import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { IntroScreen } from '../screens';

const StackNavigator = createStackNavigator({
    IntroScreen: {
        screen: IntroScreen
    }
}, { headerMode: 'none' });

const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;