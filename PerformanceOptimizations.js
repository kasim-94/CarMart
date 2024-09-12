// src/utils/performanceOptimizations.js
import { InteractionManager } from 'react-native';

export const runAfterInteractions = (task) => {
  InteractionManager.runAfterInteractions(() => {
    task();
  });
};

export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Usage example:
// const memoizedExpensiveCalculation = memoize(expensiveCalculation);