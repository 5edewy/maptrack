import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RouterNavigator from './RouterNavigator';
import { StripeProvider } from '@stripe/stripe-react-native';
import { publishableKey } from './components/Common/HelperFunctions'


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
                    <StatusBar hidden />
                    <RouterNavigator />
                </NavigationContainer>
            </StripeProvider>
        );
    }
}

export default App;
