import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import CentreRoutingScreen from './components/CentreRoutingScreen';
import AdminRecordsScreen from './components/AdminRecordsScreen';
import CentreRoutingMapScreen from './components/CentreRoutingMapScreen';
import ShuttleBusScreen from './components/ShuttleBusScreen';
import ExternalDirectScreen from './components/ExternalVisitTrackerScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CentreRouting" component={CentreRoutingScreen} />
        <Stack.Screen name="ExternalDirect" component={ExternalDirectScreen} />
        <Stack.Screen name="ShuttleBus" component={ShuttleBusScreen} />
        <Stack.Screen name="AdminRecords" component={AdminRecordsScreen} />
        <Stack.Screen name="CentreRoutingMap" component={CentreRoutingMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
