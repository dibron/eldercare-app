import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

const CentreRoutingScreen = ({ navigation }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const onSubmit = () => {
    console.log('Form Submitted!');
    console.log('Input 1:', input1);
    console.log('Input 2:', input2);
    navigation.navigate('CentreRoutingMap', { input1, input2 });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}>
        <TextInput
          placeholder="Input 1"
          value={input1}
          onChangeText={text => setInput1(text)}
          style={{ height: 40, padding: 10 }}
        />
      </View>
      <View style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}>
        <TextInput
          placeholder="Input 2"
          value={input2}
          onChangeText={text => setInput2(text)}
          style={{ height: 40, padding: 10 }}
        />
      </View>
      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 10, alignItems: 'center' }}
        onPress={onSubmit}>
        <Text style={{ color: 'white' }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CentreRoutingScreen;
