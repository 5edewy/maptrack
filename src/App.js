import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RouterNavigator from './RouterNavigator';
import { StripeProvider } from '@stripe/stripe-react-native';

const publishableKey = "pk_test_A4NpuY8IglXSz4BGF0xQIkXE";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <StripeProvider
                publishableKey={publishableKey}
            // merchantIdentifier="merchant.identifier"

            >
                <NavigationContainer

                >
                    <RouterNavigator />
                </NavigationContainer>
            </StripeProvider>
        );
    }
}

export default App;
