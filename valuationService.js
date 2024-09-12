// src/services/valuationService.js
import axios from 'axios';

const API_KEY = 'your_api_key';
const BASE_URL = 'https://api.somecarvaluationservice.com/v1';

export async function getCarValuation(make, model, year, mileage, condition) {
  try {
    const response = await axios.get(`${BASE_URL}/valuation`, {
      params: { make, model, year, mileage, condition },
      headers: { 'X-Api-Key': API_KEY }
    });
    return response.data.estimatedValue;
  } catch (error) {
    console.error('Error fetching car valuation:', error);
    throw error;
  }
}