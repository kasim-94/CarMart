// src/services/gamificationService.js
import axios from 'axios';

const API_ENDPOINT = 'https://your-backend.com/api';

export async function getUserProfile(userId) {
  try {
    const response = await axios.get(`${API_ENDPOINT}/user-profile/${userId}`);
    return response.data.profile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function awardPoints(userId, action) {
  try {
    const response = await axios.post(`${API_ENDPOINT}/award-points`, { userId, action });
    return response.data.pointsAwarded;
  } catch (error) {
    console.error('Error awarding points:', error);
    throw error;
  }
}

export async function getLeaderboard() {
  try {
    const response = await axios.get(`${API_ENDPOINT}/leaderboard`);
    return response.data.leaderboard;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
}

export async function redeemReward(userId, rewardId) {
  try {
    const response = await axios.post(`${API_ENDPOINT}/redeem-reward`, { userId, rewardId });
    return response.data.redemptionResult;
  } catch (error) {
    console.error('Error redeeming reward:', error);
    throw error;
  }
}