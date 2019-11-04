import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ProfileScreen } from '../screens';

const StackNavigator = createStackNavigator({
    ProfileScreen: {
        screen: ProfileScreen
    }
}, { headerMode: 'none' });

const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;