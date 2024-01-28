import axios from 'axios';
import { AUTH_URL } from '../config/constants';

export const signupUser = async (data) => {
  try {
    const res = await axios.post(AUTH_URL, {
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
  const res = await axios.post(`${AUTH_URL}/login`, data);
  return res?.response?.data;
};
