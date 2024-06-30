import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const OsmDirectionsMap = ({ route }) => {
  const { coordinates, centreCoordinates, clientSeqN } = route.params;

  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const fetchDirections = async () => {
      if (coordinates.length < 1 || !centreCoordinates) {
        console.error('At least one client coordinate and centre coordinate are required to draw a route');
        return;
      }

      // Sort coordinates based on clientSeqN
      const sortedCoordinates = coordinates
        .map((coord, index) => ({ ...coord, seq: clientSeqN[index] }))
        .sort((a, b) => a.seq - b.seq)
        .map(coord => ({ latitude: coord.latitude, longitude: coord.longitude }));

      const fullCoordinates = [centreCoordinates, ...sortedCoordinates, centreCoordinates];
      const waypoints = fullCoordinates.map(coord => `${coord.longitude},${coord.latitude}`).join(';');
      const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${waypoints}?geometries=geojson`;

      try {
        const response = await fetch(osrmUrl);
        const data = await response.json();
        if (data.code === 'Ok') {
          const coordinates = data.routes[0].geometry.coordinates.map(coord => ({
            latitude: coord[1],
            longitude: coord[0]
          }));
          setRouteCoordinates(coordinates);
          setDuration(data.routes[0].duration / 60); // Convert duration to minutes
        } else {
          console.error('Failed to fetch directions:', data);
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    };

    fetchDirections();
  }, [coordinates, centreCoordinates, clientSeqN]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: centreCoordinates.latitude,
          longitude: centreCoordinates.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        zoomEnabled={true}
        loadingEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker
          coordinate={centreCoordinates}
          title="Centre"
          pinColor="blue"
        />
        {/* Render each marker with a different key to ensure proper rendering */}
        {coordinates.map((coord, index) => (
          <Marker
            key={`marker-${index}`}
            coordinate={coord}
            title={`Client Seq: ${clientSeqN && clientSeqN[index] !== undefined ? clientSeqN[index] : 'Unknown'}`}
          />
        ))}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="red"
            strokeWidth={2}
          />
        )}
      </MapView>
      {duration && (
        <View style={styles.durationContainer}>
          <Text>Estimated Duration: {duration.toFixed(1)} minutes</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
  },
  durationContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default OsmDirectionsMap;
