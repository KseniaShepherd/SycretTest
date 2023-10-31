import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCertificates = createAsyncThunk(
  'certificates/fetchCertificates',
  async (_, thunkAPI) => {
    const params = {
      ApiKey:'011ba11bdcad4fa396660c2ec447ef14',
      MethodName: 'OSGetGoodList',
    };
    try {
       const response = await axios.post('https://sycret.ru/service/api/api', params);
      if (response.data.result === 0) {
        return response.data.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.resultdescription);
      }
    } catch (error) { 
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  certificates: [],
  selectedCertificate: null,
  status: 'idle',
  error: null,
};

const certificateSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    setSelectedCertificate: (state, action) => {
      state.selectedCertificate = action.payload;
    },
    clearSelectedCertificate:(state)=>{
      state.selectedCertificate = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.certificates = action.payload;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const {setSelectedCertificate, clearSelectedCertificate} = certificateSlice.actions;
export default certificateSlice.reducer;

export const selectSelectedCertificate = (state) => state.certificates.selectedCertificate;
