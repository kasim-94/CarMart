// src/services/sharingService.js
import { Share } from 'react-native';
import axios from 'axios';

export async function shareCarListing(carId) {
  try {
    const result = await Share.share({
      message: `Check out this car on SellAnyCar: https://yourapp.com/car/${carId}`,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    console.error('Error sharing car listing:', error);
  }
}

export async function generateReferralCode(userId) {
  try {
    const response = await axios.post('/api/generate-referral-code', { userId });
    return response.data.referralCode;
  } catch (error) {
    console.error('Error generating referral code:', error);
    throw error;
  }
}

export async function applyReferralCode(referralCode) {
  try {
    const response = await axios.post('/api/apply-referral-code', { referralCode });
    return response.data.reward;
  } catch (error) {
    console.error('Error applying referral code:', error);
    throw error;
  }
}