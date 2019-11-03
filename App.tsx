import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './app/navigation';
import Store from './app/store';

const App = () => (
    <Provider store={Store}>
        <AppNavigator />
    </Provider>
);

export default App;
