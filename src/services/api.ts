// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001', 
});

export const getData = async () => {
  try {
    const response = await api.get('/create');
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
