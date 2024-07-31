import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet, ScrollView, Animated, PanResponder, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "./firebase-config";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const AdminRecordsScreen = () => {
  const [center, setCenter] = useState("(1) To Centre");
  const [day, setDay] = useState("(1) Mon");
  const [serviceType, setServiceType] = useState("DayCare");
  const [documents, setDocuments] = useState([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const animatedValue = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const fetchDocuments = async () => {
    try {
      const q = query(
        collection(db, 'elderInfo'),
        where('svcType', '==', serviceType),
        where('toFromCentreI', '==', center),
        where('weekDay', '==', day)
      );
      
      const querySnapshot = await getDocs(q);
  
      const documentsData = querySnapshot.docs.map((doc) => doc.data());
      setDocuments(documentsData);
  
    } catch (error) {
      console.error('Error fetching documents: ', error);
    }
  };
  
  useEffect(() => {
    fetchDocuments();
  }, [center, day, serviceType]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.timing(animatedValue, {
            toValue: SCREEN_HEIGHT,
            duration: 300,
            useNativeDriver: true
          }).start(() => setBottomSheetVisible(false));
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 50) {
          Animated.timing(animatedValue, {
            toValue: SCREEN_HEIGHT,
            duration: 300,
            useNativeDriver: true
          }).start(() => setBottomSheetVisible(false));
        } else {
          Animated.spring(animatedValue, {
            toValue: 0,
            bounciness: 10,
            useNativeDriver: true
          }).start();
        }
      }
    })
  ).current;

  const toggleBottomSheet = () => {
    if (bottomSheetVisible) {
      Animated.timing(animatedValue, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true
      }).start(() => setBottomSheetVisible(false));
    } else {
      setBottomSheetVisible(true);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Records Screen</Text>

      <Picker
        selectedValue={center}
        style={styles.picker}
        onValueChange={(itemValue) => setCenter(itemValue)}
      >
        <Picker.Item label="To Centre" value="(1) To Centre" />
        <Picker.Item label="From Centre" value="from" />
      </Picker>

      <Picker
        selectedValue={day}
        style={styles.picker}
        onValueChange={(itemValue) => setDay(itemValue)}
      >
        <Picker.Item label="Monday" value="(1) Mon" />
        <Picker.Item label="Tuesday" value="Tuesday" />
        <Picker.Item label="Wednesday" value="Wednesday" />
        <Picker.Item label="Thursday" value="Thursday" />
        <Picker.Item label="Friday" value="Friday" />
        <Picker.Item label="Saturday" value="Saturday" />
        <Picker.Item label="Sunday" value="Sunday" />
      </Picker>

      <Picker
        selectedValue={serviceType}
        style={styles.picker}
        onValueChange={(itemValue) => setServiceType(itemValue)}
      >
        <Picker.Item label="DayCare" value="DayCare" />
        <Picker.Item label="Rehab" value="Rehab" />
      </Picker>

      <Button title="Send Request" onPress={fetchDocuments} />
      
      <View>
        <Button title="View Documents" onPress={toggleBottomSheet} />
      </View>

      {bottomSheetVisible && (
        <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: animatedValue }] }]} {...panResponder.panHandlers}>
          <ScrollView>
            <View style={styles.bottomSheetContent}>
              <Button title="Close" onPress={toggleBottomSheet} />
              <View style={styles.tableRow}>
                <Text style={styles.columnHeader}>Centre Postal Code</Text>
                <Text style={styles.columnHeader}>Gender</Text>
                <Text style={styles.columnHeader}>Name Surname</Text>
                <Text style={styles.columnHeader}>Client Postal Code</Text>
              </View>
              {documents.map((doc, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.columnData}>{doc.centrePostalCode}</Text>
                  <Text style={styles.columnData}>{doc.gender}</Text>
                  <Text style={styles.columnData}>{doc.nameSurname}</Text>
                  <Text style={styles.columnData}>{doc.clientPostalCode}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT * 0.5,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  bottomSheetContent: {
    padding: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  columnHeader: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "#007bff",
  },
  columnData: {
    flex: 1,
    textAlign: "center",
    color: "#555",
  }
});

export default AdminRecordsScreen;
