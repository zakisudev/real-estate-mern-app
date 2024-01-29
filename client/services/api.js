import axios from 'axios';
import { AUTH_URL, USERS_URL } from '../config/constants';

export const signupUser = async (data) => {
  try {
    const res = await axios.post(`${AUTH_URL}/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const signinUser = async (data) => {
  try {
    const res = await axios.post(`${AUTH_URL}/login`, data);
    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const signInWithGoogle = async (data) => {
  try {
    const res = await axios.post(`${AUTH_URL}/google-login`, data);
    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const profileUpdate = async (data, id) => {
  try {
    const res = await axios.post(`${USERS_URL}/update/${id}`, data);
    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${USERS_URL}/delete/${id}`);
    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
