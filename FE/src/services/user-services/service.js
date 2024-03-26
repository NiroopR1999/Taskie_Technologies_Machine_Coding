import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async (filter) => {
  try {
    const response = await axios.get(
      API_URL + `/user/user-list?${filter}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const createUser = async (formData) => {
  try {
    const response = await axios.post(API_URL + `/user/add`, formData);
    return response;
  } catch (error) {
    return error;
  }
};



export const deleteUser = async (email) => {
  try {
    const response = await axios.put(API_URL + `/user/remove?${email}`);
    return response;
  } catch (error) {
    return error;
  }
};
