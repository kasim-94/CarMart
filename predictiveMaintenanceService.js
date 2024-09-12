// src/services/predictiveMaintenanceService.js
import axios from 'axios';

const API_ENDPOINT = 'https://your-iot-backend.com/api';

export async function registerVehicle(vehicleId, userId) {
  try {
    const response = await axios.post(`${API_ENDPOINT}/register-vehicle`, { vehicleId, userId });
    return response.data;
  } catch (error) {
    console.error('Error registering vehicle for predictive maintenance:', error);
    throw error;
  }
}

export async function getMaintenanceAlerts(vehicleId) {
  try {
    const response = await axios.get(`${API_ENDPOINT}/maintenance-alerts/${vehicleId}`);
    return response.data.alerts;
  } catch (error) {
    console.error('Error fetching maintenance alerts:', error);
    throw error;
  }
}

export function subscribeToAlerts(vehicleId, callback) {
  // Implement real-time subscription to alerts using WebSockets or a similar technology
  const socket = new WebSocket(`wss://your-iot-backend.com/ws/alerts/${vehicleId}`);
  
  socket.onmessage = (event) => {
    const alert = JSON.parse(event.data);
    callback(alert);
  };

  return () => socket.close(); // Return a function to unsubscribe
}