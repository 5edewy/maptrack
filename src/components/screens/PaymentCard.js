import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { CardField, useConfirmPayment, } from '@stripe/stripe-react-native';


export default function PaymentCard() {
    const clientsecret = "sk_test_z4N8mZoFvnpQY1tZgxSCQGl1";
    const { confirmPayment, loading } = useConfirmPayment()


    const _hanlePayment = async () => {
        const { error, paymentIntent } = await confirmPayment(clientsecret, {
            type: 'Card',
            // token: 'tok_us',
            // paymentMethodId: 'pm_card_us',
            // billingDetails: {
            //     name: 'Mohamed Khaled',

            // },
            // setupFutureUsage: 'OnSession'
            // name: 'jenny Rosen',

        })

        if (error) {
            console.log("err", error);
            alert(error.message)
        } else if (paymentIntent) {
            console.log("ss", paymentIntent);
            alert("success", paymentIntent.id)
        }
    }

    return (
        <View style={{
            flex: 1,
            paddingHorizontal: 10
        }}>
            <Text> PaymentCard </Text>
            <CardField

                postalCodeEnabled={false}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);
                }}
                onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                }}
            />
            <Button
                disabled={loading}
                onPress={_hanlePayment}
                title='PAY'
            ></Button>
        </View>
    );
}