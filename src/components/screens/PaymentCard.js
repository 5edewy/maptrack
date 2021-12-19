import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { CardField, useConfirmPayment, } from '@stripe/stripe-react-native';
import styles from '../Assets/style/styles';


export default function PaymentCard(props) {

    const { replace } = props.navigation
    const { confirmPayment, loading } = useConfirmPayment()

    const showAlertI = (text) => {
        Alert.alert(
            'Done Your Payment',
            `${text}`,
            [

                {
                    text: 'OK', onPress: () => replace("Home", {
                        flag: "flag"
                    })
                },
            ]
        );
    }
    // THIS Function Fetch LOCALHOST TO GET THE CLIENT_SECRET
    const _hanlePayment_withexpress = async () => {
        const response = await fetch(`http://10.0.2.2:3000/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paymentMethodType: 'card',
                currency: 'usd'
            })
        }).catch(error => {

        })

        const { clientsecret } = await response.json()


        const { error, paymentIntent } = await confirmPayment(clientsecret, {
            type: 'Card',
            billingDetails: {
                name: 'Mohamed Khaled'
            }
        })
        if (error) {
            alert(error.message)
            // showAlertI(error.message)
        } else if (paymentIntent) {

            showAlertI(paymentIntent.id)
        }
    }

    const _hanlePayment = async () => {
        const { error, paymentIntent } = await
            confirmPayment("pi_3K882TKbht1ZQ9KD0ERQtvZs_secret_CK17wx2udrLZHtLzRLq5oZeTj", {
                type: 'Card',
            })

        if (error) {
            showAlertI(error.message)
            // navigate("Home", {
            //     startTrack: true
            // })
        } else if (paymentIntent) {
            showAlertI(paymentIntent.id)
            // navigate("Home", {
            //     startTrack: true
            // })
        }
    }

    return (
        <View style={styles.paymentContainer}>
            <Text style={styles.labelText} >{"PLEASE , CHECK YOUR PAYMENT !"}</Text>
            <Text style={styles.labelsubText} >{"Enter Your Card Number Here"}</Text>
            <CardField
                postalCodeEnabled={false}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={styles.cardStyle}
                style={styles.additionalCardStyle}

            />
            <Button
                disabled={loading}
                onPress={_hanlePayment}
                title='PAY'
            />
        </View>
    );
}