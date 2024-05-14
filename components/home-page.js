import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const handleButtonPress = (buttonText) => {
    alert(`You pressed ${buttonText} button!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Expo App!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress("Button 1")}
      >
        <Text style={styles.buttonText}>Button 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress("Button 2")}
      >
        <Text style={styles.buttonText}>Button 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress("Button 3")}
      >
        <Text style={styles.buttonText}>Button 3</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress("Button 4")}
      >
        <Text style={styles.buttonText}>Button 4</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
