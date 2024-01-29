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
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
} = userSlice.actions;

export default userSlice.reducer;
