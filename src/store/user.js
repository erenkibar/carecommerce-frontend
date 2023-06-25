import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export const loginUser = createAsyncThunk('user/login', async (value) => {
  const res = await axios.post('/auth/login', {
    email: value.email,
    password: value.password
  });
  return res.data;
});

const slice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
    fetchingUser: null,
    fetchingError: null,
    isAuthorized: null
  },
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.fetchingUser = true;
      state.fetchingError = null;
      state.isAuthorized = null;
    },
    [loginUser.rejected]: (state, action) => {
      state.fetchingUser = false;
      state.fetchingError = true;
      state.isAuthorized = false;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.fetchingUser = false;
      state.user = action.payload;
      state.isAuthorized = true;
    }
  }
});

export default slice.reducer;
