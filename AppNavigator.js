// src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../components/Dashboard';
import CarManagement from '../components/CarManagement';
import ARCarVisualization from '../components/ARCarVisualization';
import VRCarShowroom from '../components/VRCarShowroom';
import Chat from '../components/Chat';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CarStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CarManagement" component={CarManagement} />
    <Stack.Screen name="ARVisualization" component={ARCarVisualization} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={Dashboard} />
    <Tab.Screen name="My Cars" component={CarStack} />
    <Tab.Screen name="VR Showroom" component={VRCarShowroom} />
    <Tab.Screen name="Support" component={Chat} />
  </Tab.Navigator>
);

export default AppNavigator;