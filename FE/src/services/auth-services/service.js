import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const login = async (formData) => {
  try {
    const response = await axios.post(API_URL + '/auth/login', formData);
    return response;
  } catch (error) {
    return error;
  }
};

export const signUp = async (formData) => {
  try {
    console.log(API_URL);
    const response = await axios.post(API_URL + '/auth/sign-up', formData);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
