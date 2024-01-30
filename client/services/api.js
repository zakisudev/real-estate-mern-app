import axios from 'axios';
import { AUTH_URL, USERS_URL, LISTINGS_URL } from '../config/constants';

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

export const logoutUser = async () => {
  try {
    const res = await axios.post(`${AUTH_URL}/logout`);
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

export const getUser = async (id) => {
  try {
    const res = await axios.get(`${USERS_URL}/${id}`);
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

export const createListing = async (data) => {
  try {
    const res = await axios.post(`${LISTINGS_URL}/create`, data);
    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getListings = async (id) => {
  try {
    const res = await axios.get(`${LISTINGS_URL}/user/${id}`);
    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getListing = async (id) => {
  try {
    const res = await axios.get(`${LISTINGS_URL}/${id}`);
    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const deleteListing = async (id) => {
  try {
    const res = await axios.delete(`${LISTINGS_URL}/${id}`);
    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const updateListing = async (data, id) => {
  try {
    const res = await axios.put(`${LISTINGS_URL}/${id}`, data);
    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
