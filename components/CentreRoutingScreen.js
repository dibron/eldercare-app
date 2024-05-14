import React, { Component } from 'react';
import { Text, View, TextInput, Picker, CheckBox, TouchableOpacity } from 'react-native';

export default class CentreRoutingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerName: '',
      tripId: '',
      svcType: '',
      weekDay: '',
      toFromCentre: false,
    };
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}>
          <Picker
            selectedValue={this.state.centerName}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ centerName: itemValue })
            }>
            <Picker.Item label="Select Center Name" value="" />
            <Picker.Item label="AMK" value="AMK" />
            {/* Add other center names as needed */}
          </Picker>
        </View>
        <View style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}>
          <Picker
            selectedValue={this.state.tripId}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ tripId: itemValue })
            }>
            <Picker.Item label="Select Trip ID" value="" />
            {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
              <Picker.Item key={number} label={number.toString()} value={number.toString()} />
            ))}
          </Picker>
        </View>
        <View style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}>
          <Picker
            selectedValue={this.state.svcType}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ svcType: itemValue })
            }>
            <Picker.Item label="Select Service Type" value="" />
            <Picker.Item label="Rehab" value="Rehab" />
            <Picker.Item label="DayCare" value="DayCare" />
            {/* Add other service types as needed */}
          </Picker>
        </View>
        <View style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}>
          <Picker
            selectedValue={this.state.weekDay}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ weekDay: itemValue })
            }>
            <Picker.Item label="Select Week Day" value="" />
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            {/* Add other week days as needed */}
          </Picker>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <CheckBox
            value={this.state.toFromCentre}
            onValueChange={(value) => this.setState({ toFromCentre: value })}
          />
          <Text style={{ marginLeft: 8 }}>To/From Centre</Text>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: 'blue', padding: 10, alignItems: 'center' }}
          onPress={this.onSubmit}>
          <Text style={{ color: 'white' }}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onSubmit = () => {
    // Logic to handle form submission
    // You can access the form values from this.state
    console.log('Form Submitted!');
    console.log('Center Name:', this.state.centerName);
    console.log('Trip ID:', this.state.tripId);
    console.log('Service Type:', this.state.svcType);
    console.log('Week Day:', this.state.weekDay);
    console.log('To/From Centre:', this.state.toFromCentre);
    this.props.navigation.navigate('CentreRoutingMap');
  };
}
