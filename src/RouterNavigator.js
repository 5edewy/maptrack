import React from 'react';
import { Image, Platform, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native';
import { CardStyleInterpolators, createStackNavigator, HeaderTitle, HeaderStyleInterpolators } from '@react-navigation/stack';
import Home from './components/screens/Home';
import PaymentCard from './components/screens/PaymentCard';



const Stack = createStackNavigator();



export default function RouterNavigator() {

    return (

        <Stack.Navigator

            initialRouteName="PaymentCard"


        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PaymentCard"
                component={PaymentCard}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
}