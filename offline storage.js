// src/services/offlineStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data', e);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving data', e);
  }
};

export const syncDataWhenOnline = async (syncFunction) => {
  const unsubscribe = NetInfo.addEventListener(state => {
    if (state.isConnected) {
      syncFunction();
      unsubscribe();
    }
  });
};