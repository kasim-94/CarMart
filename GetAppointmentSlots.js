// src/services/appointmentService.js
import axios from 'axios';

const BASE_URL = 'http://your-backend-url/api';

export async function getAvailableSlots(date, location) {
  try {
    const response = await axios.get(`${BASE_URL}/available-slots`, {
      params: { date, location }
    });
    return response.data.slots;
  } catch (error) {
    console.error('Error fetching available slots:', error);
    throw error;
  }
}

export async function bookAppointment(userId, carId, slot) {
  try {
    const response = await axios.post(`${BASE_URL}/book-appointment`, {
      userId,
      carId,
      slot
    });
    return response.data;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
}