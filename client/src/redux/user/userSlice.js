import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  errorMsg: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginRequest(state) {
      state.loading = true;
      state.errorMsg = null;
    },

    userLoginSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      state.errorMsg = null;
    },

    userLoginFail(state, action) {
      state.loading = false;
      state.errorMsg = action.payload;
    },

    userLogoutStart(state) {
      state.loading = true;
      state.errorMsg = null;
    },

    userLogoutSuccess(state) {
      state.loading = false;
      state.currentUser = null;
      state.errorMsg = null;
    },

    userLogoutFail(state, action) {
      state.loading = false;
      state.errorMsg = action.payload;
    },

    updateUserStart(state) {
      state.loading = true;
      state.errorMsg = null;
    },

    updateUserSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      state.errorMsg = null;
    },

    updateUserFail(state, action) {
      state.loading = false;
      state.errorMsg = action.payload;
    },

    deleteUserStart(state) {
      state.loading = true;
      state.errorMsg = null;
    },

    deleteUserSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      state.errorMsg = null;
    },

    deleteUserFail(state, action) {
      state.loading = false;
      state.errorMsg = action.payload;
    },
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogoutStart,
  userLogoutSuccess,
  userLogoutFail,
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFail,
} = userSlice.actions;

export default userSlice.reducer;
