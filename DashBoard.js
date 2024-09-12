// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getUserProfile } from '../services/gamificationService';
import { getMaintenanceAlerts } from '../services/predictiveMaintenanceService';
import { get3DModelCatalog } from '../services/3dPrintingService';

const Dashboard = ({ userId, userVehicles }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState([]);
  const [customPartsCatalog, setCustomPartsCatalog] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const profile = await getUserProfile(userId);
      setUserProfile(profile);

      const alerts = await Promise.all(
        userVehicles.map(vehicle => getMaintenanceAlerts(vehicle.id))
      );
      setMaintenanceAlerts(alerts.flat());

      const catalog = await get3DModelCatalog(userVehicles[0].make, userVehicles[0].model);
      setCustomPartsCatalog(catalog);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome, {userProfile?.name}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <Text>Points: {userProfile?.points}</Text>
        <Text>Level: {userProfile?.level}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Maintenance Alerts</Text>
        {maintenanceAlerts.map((alert, index) => (
          <Text key={index}>{alert.message}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Parts Available</Text>
        {customPartsCatalog.slice(0, 3).map((part, index) => (
          <Text key={index}>{part.name}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Dashboard;