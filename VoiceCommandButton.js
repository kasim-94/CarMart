// src/components/VoiceCommandButton.js
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { startListening, stopListening, processVoiceCommand } from '../services/voiceCommandService';

const VoiceCommandButton = ({ navigation }) => {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = async () => {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();
      const result = await new Promise(resolve => {
        Voice.onSpeechResults = (event) => {
          resolve(event.value[0]);
        };
      });
      const action = await processVoiceCommand(result);
      executeAction(action, navigation);
    }
    setIsListening(!isListening);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleListening}>
      <Text style={styles.buttonText}>{isListening ? 'Listening...' : 'Voice Command'}</Text>
    </TouchableOpacity>
  );
};

const executeAction = (action, navigation) => {
  switch (action.type) {
    case 'NAVIGATE':
      navigation.navigate(action.screen);
      break;
    case 'ASSESS_DAMAGE':
      // Trigger damage assessment
      break;
    case 'PREDICT_PRICE':
      // Trigger price prediction
      break;
    // Add more cases as needed
  }
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default VoiceCommandButton;