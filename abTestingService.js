// src/services/abTestingService.js
import { remoteFlagEvaluate } from '@amplitude/experiment-react-native-client';

export const getVariant = async (flagKey, defaultValue) => {
  try {
    const variant = await remoteFlagEvaluate(flagKey);
    return variant || defaultValue;
  } catch (error) {
    console.error('Error fetching A/B test variant:', error);
    return defaultValue;
  }
};

// Usage example:
// const buttonColor = await getVariant('new-button-color', 'blue');