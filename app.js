// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { initializeVoiceCommands, startListening, stopListening, processVoiceCommand } from './src/services/voiceCommandService';

const App = () => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    initializeVoiceCommands(handleSpeechResults);
  }, []);

  const handleSpeechResults = async (result) => {
    if (result.value) {
      const command = result.value[0];
      const action = await processVoiceCommand(command);
      executeAction(action);
    }
  };

  const executeAction = (action) => {
    // Implement action execution based on the processed command
    console.log('Executing action:', action);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
    setIsListening(!isListening);
  };

  return (
    <View>
      {/* Your existing app components */}
      <TouchableOpacity onPress={toggleListening}>
        <Text>{isListening ? 'Stop Listening' : 'Start Listening'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;