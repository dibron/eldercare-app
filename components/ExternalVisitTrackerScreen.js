import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const ExternalDirectTripsScreen = () => {
  // Origin point
  const origin = { latitude: 1.3521, longitude: 103.8198 }; // Singapore coordinates

  // Sample data for destination markers
  const destinations = [
    { id: 1, title: 'Destination 1', coordinate: { latitude: 1.2903, longitude: 103.8517 } }, // Singapore coordinates
    { id: 2, title: 'Destination 2', coordinate: { latitude: 1.3521, longitude: 103.8198 } }, // Singapore coordinates
    { id: 3, title: 'Destination 3', coordinate: { latitude: 1.3406, longitude: 103.8303 } }, // Singapore coordinates
    { id: 4, title: 'Destination 4', coordinate: { latitude: 1.3035, longitude: 103.8605 } }, // Singapore coordinates
  ];

  // Calculate polylines from origin to destinations
  const polylines = destinations.map(destination => ({
    coordinates: [origin, destination.coordinate],
    id: destination.id,
  }));

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 1.3521,
          longitude: 103.8198,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
      >
        {/* Render origin marker */}
        <Marker
          coordinate={origin}
          title="Origin"
          pinColor="blue"
        />
        
        {/* Render destination markers */}
        {destinations.map(destination => (
          <Marker
            key={destination.id}
            coordinate={destination.coordinate}
            title={destination.title}
          />
        ))}
        
        {/* Render polylines */}
        {polylines.map(polyline => (
          <Polyline
            key={polyline.id}
            coordinates={polyline.coordinates}
            strokeColor="#FF0000"
            strokeWidth={2}
          />
        ))}
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

export default ExternalDirectTripsScreen;
