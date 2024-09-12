// src/services/AnalyticsService.js
import analytics from '@react-native-firebase/analytics';

export const logEvent = async (eventName, params = {}) => {
  try {
    await analytics().logEvent(eventName, params);
    console.log(`Logged event: ${eventName}`);
  } catch (error) {
    console.error('Error logging event:', error);
  }
};

export const setUserProperties = async (properties) => {
  try {
    await analytics().setUserProperties(properties);
    console.log('User properties set successfully');
  } catch (error) {
    console.error('Error setting user properties:', error);
  }
};