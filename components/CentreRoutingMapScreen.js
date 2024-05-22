import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const CentreRoutingMapScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Add markers for origin and destination */}
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title={'Origin'} />
        <Marker coordinate={{ latitude: 37.79825, longitude: -122.4224 }} title={'Destination'} />

        {/* Add MapViewDirections component */}
        <MapViewDirections
          origin={{ latitude: 37.78825, longitude: -122.4324 }} // Origin coordinates
          destination={{ latitude: 37.79825, longitude: -122.4224 }} // Destination coordinates
          apikey={'AIzaSyBV_C4oy7UN-NnSdS8GaAjIVDd-02LQIoI'} // Google Maps API key
          strokeWidth={3} // Width of the route line
          strokeColor="hotpink" // Color of the route line
        />
      </MapView>
    </View>
  );
};

export default CentreRoutingMapScreen;
