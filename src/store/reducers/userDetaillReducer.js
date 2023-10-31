import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitUserDetails = createAsyncThunk(
  'userDetails/submitUserDetails',
  async (userDetails, thunkAPI) => {
    const params = {
      ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
      MethodName: "OSSale",
      ...userDetails
    };
    try {
      const response = await axios.post('https://sycret.ru/service/api/api', params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const initialState = {
  name: "",
  phone: "",
  message: "",
  email: ""
};

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    clearForm:(state)=>{
    state.name= "";
    state.phone= "";
    state.email= "";
    state.message= "";
    }
  },
  extraReducers: builder => {
    builder
      .addCase(submitUserDetails.fulfilled, (state, action) => {
        // обработка успешного завершения запроса
        console.log("Данные успешно отправлены:", action.payload);
      })
      .addCase(submitUserDetails.rejected, (state, action) => {
        // обработка ошибки запроса
        console.error("Ошибка отправки данных:", action.error.message);
      });
  }
});

export const { setName, setPhone, setMessage, setEmail, clearForm } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;