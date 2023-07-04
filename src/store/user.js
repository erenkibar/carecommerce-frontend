import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// const initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

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
    user: null,
    fetchingUser: null,
    fetchingError: null,
    isAuthorized: null
  },
  reducers: {
    logout(state, action) {
      state.user = null;
      state.fetchingUser = null;
      state.fetchingError = null;
      state.isAuthorized = null;
    }
  },
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
      toast.error('Wrong username/password');
    },
    [loginUser.fulfilled]: (state, action) => {
      state.fetchingUser = false;
      state.user = action.payload;
      state.isAuthorized = true;
      toast.success('Login success');

    }
  }
});

export const { logout } = slice.actions;

export default slice.reducer;
