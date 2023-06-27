import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBrands = createAsyncThunk('/brands/fetch', async (value) => {
  const res = await axios.get('/brand/get-all-brands');
  return res.data;
});

const slice = createSlice({
  name: 'brands',
  initialState: {
    brands: [],
    fetchingBrands: null,
    fetchingError: null
  },
  reducers: {},
  extraReducers: {
    [getBrands.pending]: (state, action) => {
      state.fetchingBrands = true;
      state.fetchingError = null;
    },
    [getBrands.rejected]: (state, action) => {
      state.fetchingBrands = false;
      state.fetchingError = true;
    },
    [getBrands.fulfilled]: (state, action) => {
      state.fetchingBrands = false;
      state.fetchingError = false;
      state.brands = action.payload;
    }
  }
});

export default slice.reducer;
