import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', 
});

export const createTree = async (path: string) => {
  try {
    const response = await api.post('/create', path, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return response;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};


export const openTree = async (path: string) => {
  try {
    const response = await api.post('/open', path, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return response;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};


export const saveTree = async (path: string) => {
  try {
    const response = await api.post('/save', path, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return response;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

export const searchTree = async (dni: string) => {
  try {
    const response = await api.get(`/search?dni=${dni}`);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const deleteTree = async (dni: string) => {
  try {
    const response = await api.get(`/delete?dni=${dni}`);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const insertTree = async (ciudadano: string) => {
  try {
    const response = await api.post('/add', ciudadano, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return response;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};