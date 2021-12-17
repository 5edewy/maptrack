import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, MarkerAnimated, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getbearing, locationDetails } from '../Common/HelperFunctions';

const GOOGLE_MAPS_APIKEY = "AIzaSyCq_JNe5gCCBEYQfuFMPo35vC9maHCD_uA"


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
                latitude: 30.0272,
                longitude: 31.2087,
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
    }
    animate = (latitude, longitude) => {
        // console.log("aa", latitude);
        const newCoordinate = { latitude, longitude }
        if (Platform.OS == 'android') {
            if (this.animatedmarker) {
                this.animatedmarker.animateMarkerToCoordinate(newCoordinate, 1000)
            }
        } else {
            null
        }
    }
    componentDidMount() {
        const { droplocationCords } = this.state

        this.mapView.setCamera({ droplocationCords },
            {
                edgePadding: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                },
                animated: true,
            })
    }

    movecar = (result) => {
        // console.log(result);
        const { droplocationCords } = this.state

        setTimeout(
            () => {
                if (result.coordinates.length > 21) {
                    let latitude = result.coordinates[20].latitude
                    let longitude = result.coordinates[20].longitude
                    this.animate(latitude, longitude)
                    let lat1 = result.coordinates[10].latitude
                    let lng1 = result.coordinates[10].longitude
                    let lat2 = result.coordinates[20].latitude
                    let lng2 = result.coordinates[20].longitude
                    const rotate = getbearing(lat1, lng1, lat2, lng2)
                    console.log(rotate);
                    // this.setState({ rotate: rotate })

                    this.setState({
                        pickupCords: {
                            ...result.coordinates[20],
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                        coordinate: new AnimatedRegion({
                            ...result.coordinates[20],
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

            }, 1000
        )

    }
    render() {
        const { pickupCords, droplocationCords, cardata, coordinate, rotate } = this.state
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

                        // flat={true}
                        ref={c => this.animatedmarker = c}
                        coordinate={coordinate}

                    >
                        <Image
                            style={{
                                width: 60,
                                height: 60
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

                            this.movecar(result)
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
            </View >
        );
    }
}

export default Home;
