// src/services/voiceCommandService.js
import Voice from 'react-native-voice';
import axios from 'axios';

let onSpeechResults = null;

export function initializeVoiceCommands(callback) {
  onSpeechResults = callback;
  Voice.onSpeechResults = onSpeechResults;
}

export async function startListening() {
  try {
    await Voice.start('en-US');
  } catch (error) {
    console.error('Error starting voice recognition:', error);
  }
}

export async function stopListening() {
  try {
    await Voice.stop();
  } catch (error) {
    console.error('Error stopping voice recognition:', error);
  }
}

export async function processVoiceCommand(command) {
  try {
    const response = await axios.post('/api/process-voice-command', { command });
    return response.data.action;
  } catch (error) {
    console.error('Error processing voice command:', error);
    throw error;
  }
}