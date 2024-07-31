import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, FlatList } from 'react-native';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import { CheckBox } from 'react-native-elements'; 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OsmDirectionsMap = ({ route }) => {
  const { coordinates, centreCoordinates, clientSeqN, nameSurname, transCapSubTypeN } = route.params;

  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [duration, setDuration] = useState(null);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchDirections = async () => {
      if (coordinates.length < 1 || !centreCoordinates) {
        console.error('At least one client coordinate and centre coordinate are required to draw a route');
        return;
      }

     
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
          setDuration(data.routes[0].duration / 60); 
         
          setAttendance(new Array(coordinates.length).fill(false));
        } else {
          console.error('Failed to fetch directions:', data);
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    };

    fetchDirections();
  }, [coordinates, centreCoordinates, clientSeqN]);

  const handleCheckboxToggle = (index) => {
    
    setAttendance(prevAttendance => {
      const updatedAttendance = [...prevAttendance];
      updatedAttendance[index] = !updatedAttendance[index];
      return updatedAttendance;
    });
  };

  const getMarkerColor = (type) => {
    switch (type) {
      case 'Ambulant':
        return 'red';
      case 'Wheelchair':
        return 'green';
      default:
        return 'black'; 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
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
    
          {coordinates.map((coord, index) => (
            <Marker
              key={`marker-${index}`}
              coordinate={coord}
              title={`Client Seq: ${clientSeqN && clientSeqN[index] !== undefined ? clientSeqN[index] : 'Unknown'}`}
              pinColor={getMarkerColor(transCapSubTypeN[index])} 
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
      <View style={styles.tableContainer}>
        <FlatList
          data={coordinates.map((coord, index) => ({
            clientSeqN: clientSeqN && clientSeqN[index] !== undefined ? clientSeqN[index] : 'Unknown',
            nameSurname: nameSurname && nameSurname[index] !== undefined ? nameSurname[index] : 'Unknown',
            transCapSubTypeN: transCapSubTypeN && transCapSubTypeN[index] !== undefined ? transCapSubTypeN[index] : 'Unknown',
          })).sort((a, b) => a.clientSeqN - b.clientSeqN)}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <View style={styles.row}>
                <View style={styles.info}>
                  <Text style={styles.text}>{`Client Seq: ${item.clientSeqN}`}</Text>
                  <Text style={styles.text}>{`Name: ${item.nameSurname}`}</Text>
                  <Text style={styles.text}>{`Transport Type: ${item.transCapSubTypeN}`}</Text>
                </View>
                <CheckBox
                  checked={attendance[index]}
                  onPress={() => handleCheckboxToggle(index)}
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    height: windowHeight / 2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  durationContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default OsmDirectionsMap;
