// src/services/blockchainService.js
import { ethers } from 'ethers';

const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = []; // Your contract ABI goes here

let provider;
let contract;

export async function initializeBlockchain() {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, contractABI, signer);
}

export async function addVehicleHistory(vehicleId, event) {
  if (!contract) throw new Error('Blockchain not initialized');
  
  try {
    const transaction = await contract.addVehicleEvent(vehicleId, event);
    await transaction.wait();
    console.log('Vehicle history added to blockchain');
  } catch (error) {
    console.error('Error adding vehicle history:', error);
    throw error;
  }
}

export async function getVehicleHistory(vehicleId) {
  if (!contract) throw new Error('Blockchain not initialized');
  
  try {
    const history = await contract.getVehicleHistory(vehicleId);
    return history;
  } catch (error) {
    console.error('Error getting vehicle history:', error);
    throw error;
  }
}