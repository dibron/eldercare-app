import React, { useState, useEffect } from "react";
import { View, Text, Picker, Button, Modal, StyleSheet, ScrollView } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "./firebase-config";

const AdminRecordsScreen = () => {
  const [center, setCenter] = useState("(1) To Centre");
  const [day, setDay] = useState("(1) Mon");
  const [serviceType, setServiceType] = useState("DayCare");
  const [documents, setDocuments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Admin Records Screen</Text>

      <Picker
        selectedValue={center}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setCenter(itemValue)}
      >
        <Picker.Item label="(1) To Centre" value="(1) To Centre" />
        <Picker.Item label="from" value="from" />
      </Picker>

      <Picker
        selectedValue={day}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setDay(itemValue)}
      >
        <Picker.Item label="(1) Mon" value="(1) Mon" />
        <Picker.Item label="Tuesday" value="Tuesday" />
        <Picker.Item label="Wednesday" value="Wednesday" />
        <Picker.Item label="Thursday" value="Thursday" />
        <Picker.Item label="Friday" value="Friday" />
        <Picker.Item label="Saturday" value="Saturday" />
        <Picker.Item label="Sunday" value="Sunday" />
      </Picker>

      <Picker
        selectedValue={serviceType}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setServiceType(itemValue)}
      >
        <Picker.Item label="DayCare" value="DayCare" />
        <Picker.Item label="Rehab" value="Rehab" />
      </Picker>

      {/* Add Send Request button */}
      <Button title="Send Request" onPress={fetchDocuments} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalBackground}>
          <ScrollView>
            <View style={styles.modalContent}>
              <Button title="Close" onPress={() => setModalVisible(false)} />
              <View style={styles.tableRow}>
                <Text style={styles.columnHeader}>Centre Postal Code</Text>
                <Text style={styles.columnHeader}>Gender</Text>
              </View>
              {documents.map((doc, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.columnData}>{doc.centrePostalCode}</Text>
                  <Text style={styles.columnData}>{doc.gender}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
      
      <View>
        <Button title="View Documents" onPress={() => setModalVisible(true)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%"
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  columnHeader: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center"
  },
  columnData: {
    flex: 1,
    textAlign: "center"
  }
});

export default AdminRecordsScreen;
