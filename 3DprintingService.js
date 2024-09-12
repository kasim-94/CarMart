// src/services/3dPrintingService.js
import axios from 'axios';

const API_ENDPOINT = 'https://3d-printing-service.com/api';

export async function get3DModelCatalog(carMake, carModel) {
  try {
    const response = await axios.get(`${API_ENDPOINT}/catalog`, { params: { make: carMake, model: carModel } });
    return response.data.models;
  } catch (error) {
    console.error('Error fetching 3D model catalog:', error);
    throw error;
  }
}

export async function customizePart(modelId, customizations) {
  try {
    const response = await axios.post(`${API_ENDPOINT}/customize`, { modelId, customizations });
    return response.data.customizedModelUrl;
  } catch (error) {
    console.error('Error customizing part:', error);
    throw error;
  }
}

export async function placeOrder(modelUrl, shippingDetails) {
  try {
    const response = await axios.post(`${API_ENDPOINT}/order`, { modelUrl, shippingDetails });
    return response.data.orderId;
  } catch (error) {
    console.error('Error placing 3D printing order:', error);
    throw error;
  }
}