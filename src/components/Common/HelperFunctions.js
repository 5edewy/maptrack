

const GOOGLE_MAPS_APIKEY = "AIzaSyCq_JNe5gCCBEYQfuFMPo35vC9maHCD_uA"




export function getbearing(lat1, lng1, lat2, lng2) {
    // console.log(lat1, lng1, lat2, lng2);

    const dLon = (lng2 - lng1);
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    const brng = (Math.atan2(y, x));
    // brng = (360 - ((brng + 360) % 360));
    var pi = Math.PI
    const res = brng * (180 / pi)
    return res


}



