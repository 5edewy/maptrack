import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RouterNavigator from './RouterNavigator';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (

            <NavigationContainer

            >
                <RouterNavigator />
            </NavigationContainer>

        );
    }
}

export default App;
