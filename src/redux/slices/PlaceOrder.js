import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";
import Cookies from "js-cookie"

const initialState = {
  posts: [],
  status: "idle",
  error: "",
};

export const placeOderProduct = createAsyncThunk("order/placeOrder", async (payload, { rejectWithValue }) => {
  try {
    const accessToken = Cookies.get('token');
    const response = await axiosInstance.post("order/placeOrder", payload,{
      headers: {
        'Authorization': `Bearer ${accessToken}`
    },
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

const placeOderProductSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(placeOderProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOderProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(placeOderProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default placeOderProductSlice.reducer;
