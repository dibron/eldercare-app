import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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
        {/* Add markers or other map elements here */}
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title={'Marker Title'}
          description={'Marker Description'}
        />
      </MapView>
    </View>
  );
}

export default CentreRoutingMapScreen;
