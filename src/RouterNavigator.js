import React from 'react';
import { Image, Platform, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native';
import { CardStyleInterpolators, createStackNavigator, HeaderTitle, HeaderStyleInterpolators } from '@react-navigation/stack';
import Home from './components/screens/Home';



const Stack = createStackNavigator();



export default function RouterNavigator() {

    return (

        <Stack.Navigator

            initialRouteName="Home"


        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />


        </Stack.Navigator>
    );
}