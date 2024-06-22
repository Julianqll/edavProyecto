import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', 
});

export const createTree = async () => {
  try {
    const response = await api.get('/create');
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const deserializeTree = async () => {
  try {
    const response = await api.get('/open');
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

