import React, { Component } from 'react';
import { View, StyleSheet, Platform, Image, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles from '../Assets/style/styles';
import { getbearing, getLocation, GOOGLE_MAPS_APIKEY } from '../Common/HelperFunctions';



class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rotate: 0,
            pickupCords: {
                latitude: 31.0449,
                longitude: 31.3537,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            droplocationCords: {
                latitude: 24.0889,
                longitude: 32.8998,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            coordinate: new AnimatedRegion({
                latitude: 31.0449,
                longitude: 31.3537,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })

        };
        this.currentPossition()
    }


    async currentPossition() {

        const region = await getLocation()
        if (region) {

            this.setState({
                pickupCords: {
                    latitude: region.latitude,
                    longitude: region.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
            })

        }
    }

    animate = (latitude, longitude) => {

        const newCoordinate = { latitude, longitude }
        if (Platform.OS == 'android') {
            if (this.animatedmarker) {
                this.animatedmarker.animateMarkerToCoordinate(newCoordinate, 1000)
            }
        } else {
            null
        }
    }

    movecar = (result) => {
        const { droplocationCords } = this.state

        setTimeout(
            () => {
                if (result.coordinates.length > 11) {
                    let latitude = result.coordinates[10].latitude
                    let longitude = result.coordinates[10].longitude
                    this.animate(latitude, longitude)
                    let lat1 = result.coordinates[5].latitude
                    let lng1 = result.coordinates[5].longitude
                    let lat2 = result.coordinates[10].latitude
                    let lng2 = result.coordinates[10].longitude
                    const rotate = getbearing(lat1, lng1, lat2, lng2)

                    // this.setState({ rotate: rotate })

                    this.setState({
                        pickupCords: {
                            ...result.coordinates[10],
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                        coordinate: new AnimatedRegion({
                            ...result.coordinates[10],
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }),
                        rotate: rotate

                    })
                } else {

                    this.setState({
                        pickupCords: droplocationCords,
                        coordinate: new AnimatedRegion(
                            droplocationCords
                        ),
                    },
                        this.mapView.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: 30,
                                bottom: 30,
                                left: 30,
                                top: 200,
                            }
                        }))
                }

            }, 1500
        )

    }
    render() {
        // STATE:
        const { pickupCords, droplocationCords,
            cardata, coordinate, rotate, } = this.state

        // PROPS:
        const { navigation } = this.props
        const flag = this.props.route?.params?.flag

        return (
            <View style={{
                flex: 1
            }}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={StyleSheet.absoluteFill}
                    initialRegion={pickupCords}
                    ref={c => this.mapView = c}
                >
                    <Marker.Animated
                        flat={true}
                        ref={c => this.animatedmarker = c}
                        coordinate={coordinate}
                    >
                        <Image
                            style={{
                                ...styles.carIMG
                                ,
                                resizeMode: 'contain',
                                transform: [{ rotate: `${rotate}deg` }]
                            }}
                            source={require('../Assets/images/car.png')}
                        />
                    </Marker.Animated>
                    <Marker
                        coordinate={droplocationCords}
                    />

                    <MapViewDirections
                        origin={pickupCords}
                        destination={droplocationCords}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor='red'
                        optimizeWaypoints={true}
                        splitWaypoints={true}
                        onReady={result => {

                            if (flag) {
                                this.movecar(result)
                            }

                            this.mapView.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: 30,
                                    bottom: 30,
                                    left: 30,
                                    top: 200,
                                }
                            });


                        }}
                    />
                </MapView>
                <View style={styles.holderbtn}>
                    <Button
                        onPress={() => navigation.navigate("PaymentCard")}
                        title='Confirm Pay' />
                </View>


            </View >
        );
    }
}

export default Home;
