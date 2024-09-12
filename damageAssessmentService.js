// src/services/damageAssessmentService.js
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

let model;

export async function loadDamageAssessmentModel() {
  try {
    model = await tf.loadGraphModel('FILE://path/to/your/damage_assessment_model');
    console.log('Damage assessment model loaded successfully');
  } catch (error) {
    console.error('Error loading damage assessment model:', error);
  }
}

export async function assessCarDamage(imageUri) {
  if (!model) throw new Error('Model not loaded');

  try {
    // Preprocess the image
    const processedImage = await preprocessImage(imageUri);

    // Make a prediction
    const tensorImage = tf.browser.fromPixels(processedImage, 3).expandDims(0);
    const prediction = await model.predict(tensorImage);

    // Process the prediction
    const damageAssessment = processPrediction(prediction);

    return damageAssessment;
  } catch (error) {
    console.error('Error assessing car damage:', error);
    throw error;
  }
}

async function preprocessImage(imageUri) {
  // Resize and normalize the image
  const manipResult = await manipulateAsync(
    imageUri,
    [{ resize: { width: 224, height: 224 } }],
    { format: SaveFormat.JPEG }
  );

  const imageData = await fetch(manipResult.uri);
  const arrayBuffer = await imageData.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  
  const decodedImage = decodeJpeg(uint8Array);
  return decodedImage;
}

function processPrediction(prediction) {
  // Process the model's output into a meaningful damage assessment
  // This will depend on how your model is structured
  const damageClasses = ['No Damage', 'Minor Damage', 'Moderate Damage', 'Severe Damage'];
  const predictionArray = prediction.dataSync();
  const maxPredictionIndex = predictionArray.indexOf(Math.max(...predictionArray));
  
  return {
    damageLevel: damageClasses[maxPredictionIndex],
    confidence: predictionArray[maxPredictionIndex]
  };
}