import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';

const ShuttleBusScreen = () => {
  // Sample data for markers and polygon
  const markers = [
    { id: 1, title: 'Marker 1', coordinate: { latitude: 37.78825, longitude: -122.4324 } },
    { id: 2, title: 'Marker 2', coordinate: { latitude: 37.7749, longitude: -122.4194 } },
    { id: 3, title: 'Marker 3', coordinate: { latitude: 37.7799, longitude: -122.4148 } },
    { id: 4, title: 'Marker 4', coordinate: { latitude: 37.781, longitude: -122.412 } },
    { id: 5, title: 'Marker 5', coordinate: { latitude: 37.785, longitude: -122.409 } },
  ];

  const polygonCoordinates = [
    { latitude: 37.78825, longitude: -122.4324 },
    { latitude: 37.7749, longitude: -122.4194 },
    { latitude: 37.7799, longitude: -122.4148 },
    { latitude: 37.781, longitude: -122.412 },
    { latitude: 37.785, longitude: -122.409 },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7793,
          longitude: -122.419,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
          />
        ))}
        <Polygon
          coordinates={polygonCoordinates}
          strokeColor="#000"
          fillColor="rgba(0,0,0,0)"
          strokeWidth={2}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default ShuttleBusScreen;
