// src/components/AccessibleComponent.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AccessibleComponent = ({ onPress, label, hint }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessible={true}
      accessibilityLabel={label}
      accessibilityHint={hint}
      accessibilityRole="button"
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default AccessibleComponent;