import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "./firebase-config"; // Ensure the path is correct based on your file structure

const CentreRoutingScreen = ({ navigation }) => {
  const [centreName, setCentreName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [toFromCentre, setToFromCentre] = useState("");
  const [day, setDay] = useState("");
  const [tripID, setTripID] = useState(""); // Initial value should be a number
  const [documents, setDocuments] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [centreCoordinates, setCentreCoordinates] = useState(null);

  const onSubmit = async () => {
    try {
      const q = query(
        collection(db, "elderInfo"), // Replace with your collection name
        where("centreN", "==", centreName),
        where("svcType", "==", serviceType),
        where("toFromCentreI", "==", toFromCentre),
        where("weekDay", "==", day),
        where("tripID", "==", parseInt(tripID))
      );
      const querySnapshot = await getDocs(q);
      const documentsData = querySnapshot.docs.map((doc) => doc.data());
      setDocuments(documentsData);

      const postalCodes = documentsData.map((doc) => doc.clientPostalCode);
      const centrePostalCode = documentsData[0]?.centrePostalCode;

      const nameSurname = documentsData.map((doc) => doc.nameSurname);
      const transCapSubTypeN = documentsData.map((doc) => doc.transCapSubTypeN);
      const clientSeqN = documentsData.map((doc) => doc.clientSeqN);

      documentsData.forEach((doc, index) => {
        console.log(`Client Seq: ${doc.clientSeqN}, Postal Code: ${doc.clientPostalCode}`);
      });

      const clientCoordinates = await Promise.all(
        postalCodes.map(convertPostalCodeToCoordinates)
      );
      setCoordinates(clientCoordinates);

      if (centrePostalCode) {
        const centreCoord = await convertPostalCodeToCoordinates(centrePostalCode);
        setCentreCoordinates(centreCoord);

        navigation.navigate("CentreRoutingMap", {
          coordinates: clientCoordinates,
          centreCoordinates: centreCoord,
          nameSurname,
          transCapSubTypeN,
          clientSeqN,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const convertPostalCodeToCoordinates = async (postalCode) => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${postalCode}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data && data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      } else {
        console.error("No coordinates found for postal code:", postalCode);
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Centre Routing Form</Text>
        <View style={styles.inputContainer}>
          <RNPickerSelect
            onValueChange={(value) => setCentreName(value)}
            items={[
              { label: "AMK", value: "AMK" },
              // Add more centre names here
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: "Select Centre Name", value: null }}
          />
        </View>
        <View style={styles.inputContainer}>
          <RNPickerSelect
            onValueChange={(value) => setServiceType(value)}
            items={[
              { label: "DayCare", value: "DayCare" },
              { label: "Rehab", value: "Rehab" },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: "Select Service Type", value: null }}
          />
        </View>
        <View style={styles.inputContainer}>
          <RNPickerSelect
            onValueChange={(value) => setToFromCentre(value)}
            items={[
              { label: "To Centre", value: "(1) To Centre" },
              { label: "From Centre", value: "From Centre" },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: "Select To/From Centre", value: null }}
          />
        </View>
        <View style={styles.inputContainer}>
          <RNPickerSelect
            onValueChange={(value) => setDay(value)}
            items={[
              { label: "Monday", value: "(1) Mon" },
              { label: "Tuesday", value: "Tuesday" },
              { label: "Wednesday", value: "Wednesday" },
              { label: "Thursday", value: "Thursday" },
              { label: "Friday", value: "Friday" },
              { label: "Saturday", value: "Saturday" },
              { label: "Sunday", value: "Sunday" },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: "Select WeekDay", value: null }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Trip ID"
            value={tripID.toString()} // Ensure the value is always a string
            onChangeText={(text) => setTripID(parseInt(text))} // Parse text input to integer
            style={styles.textInput}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  textInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    paddingHorizontal: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  inputAndroid: {
    height: 40,
    paddingHorizontal: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
});

export default CentreRoutingScreen;
