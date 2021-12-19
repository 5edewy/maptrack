import {
    Linking, Platform, PermissionsAndroid, ToastAndroid
} from "react-native";
import Geolocation from 'react-native-geolocation-service';


// CONST
export const GOOGLE_MAPS_APIKEY = "AIzaSyCq_JNe5gCCBEYQfuFMPo35vC9maHCD_uA"
export const publishableKey = "pk_test_A4NpuY8IglXSz4BGF0xQIkXE";



export function getbearing(lat1, lng1, lat2, lng2) {

    const dLon = (lng2 - lng1);
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    const brng = (Math.atan2(y, x));
    // brng = (360 - ((brng + 360) % 360));
    var pi = Math.PI
    const res = brng * (180 / pi)
    return res


}
const hasPermissionIOS = async () => {
    const openSetting = () => {
        Linking.openSettings().catch(() => {
            alert('Unable to open settings')
        });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
        return true;
    }



    return false;
};

export const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
        const hasPermission = await hasPermissionIOS();
        return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
        return true;
    }

    const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show(
            'Location permission denied by user.',
            ToastAndroid.LONG,
        );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        ToastAndroid.show(
            'Location permission revoked by user.',
            ToastAndroid.LONG,
        );
    }

    return false;
};

export const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
        return false;
    }
    const getCoords = async () => {
        const pos = new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(resolve, reject, {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
                forceRequestLocation: true,
                showLocationDialog: true,
            });

        });
        return pos.then((respo) => {

            return respo
        }).catch((error) => {
            alert(error.message)
            return false
        });
    };

    const coords = await getCoords();
    return coords ? { latitude: coords.coords.latitude, longitude: coords.coords.longitude } : false;

};

