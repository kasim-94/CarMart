// src/context/AppContext.js
import React, { createContext, useState, useEffect } from 'react';
import { initializeBlockchain } from '../services/blockchainService';
import { loadDamageAssessmentModel } from '../services/damageAssessmentService';
import { loadModel as loadPricePredictionModel } from '../services/pricePredictionService';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    setIsLoading(true);
    try {
      await initializeBlockchain();
      await loadDamageAssessmentModel();
      await loadPricePredictionModel();
      // Load user data, cars, etc.
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing app:', error);
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ user, setUser, cars, setCars, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};