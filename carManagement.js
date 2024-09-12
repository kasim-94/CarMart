// src/components/CarManagement.js
import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { assessCarDamage } from '../services/damageAssessmentService';
import { getVehicleHistory } from '../services/blockchainService';
import { predictFuturePrice } from '../services/pricePredictionService';

const CarManagement = ({ car }) => {
  const [damageAssessment, setDamageAssessment] = useState(null);
  const [vehicleHistory, setVehicleHistory] = useState([]);
  const [futurePrice, setFuturePrice] = useState(null);

  const handleDamageAssessment = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const assessment = await assessCarDamage(result.uri);
      setDamageAssessment(assessment);
    }
  };

  const fetchVehicleHistory = async () => {
    const history = await getVehicleHistory(car.id);
    setVehicleHistory(history);
  };

  const predictPrice = async () => {
    const price = await predictFuturePrice(car);
    setFuturePrice(price);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{car.make} {car.model}</Text>
      
      <Button title="Assess Damage" onPress={handleDamageAssessment} />
      {damageAssessment && (
        <View style={styles.section}>
          <Text>Damage Level: {damageAssessment.damageLevel}</Text>
          <Text>Confidence: {damageAssessment.confidence.toFixed(2)}</Text>
        </View>
      )}

      <Button title="Fetch Vehicle History" onPress={fetchVehicleHistory} />
      {vehicleHistory.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle History</Text>
          {vehicleHistory.map((event, index) => (
            <Text key={index}>{event.date}: {event.description}</Text>
          ))}
        </View>
      )}

      <Button title="Predict Future Price" onPress={predictPrice} />
      {futurePrice && (
        <View style={styles.section}>
          <Text>Estimated Future Value: ${futurePrice.toFixed(2)}</Text>
        </View>
      )}
    </View>
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
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CarManagement;