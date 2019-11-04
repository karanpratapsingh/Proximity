import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ProfileScreen } from '../screens';

const StackNavigator = createBottomTabNavigator({
    ProfileScreen: {
        screen: ProfileScreen
    }
}, { });

const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;