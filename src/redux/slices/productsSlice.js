import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";
import Cookies from "js-cookie"
const initialState = {
  posts: [],
  status: "idle",
  error: "",
};

export const AddProduct = createAsyncThunk("product/addProductData", async (payload, { rejectWithValue }) => {
  try {
    const token = Cookies.get('token');
    const response = await axiosInstance.post("product/addProductData", payload,{
      headers : {
        'Authorization': `Bearer ${token}`
      }
    });
    return response?.data;
  } catch (err) {
    if (err.response) {
      return rejectWithValue(err.response.data);
    } else if (err.request) {
      return rejectWithValue({ message: "No response from server" });
    } else {
      return rejectWithValue({ message: err.message });
    }
  }

});

const productsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(AddProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(AddProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
