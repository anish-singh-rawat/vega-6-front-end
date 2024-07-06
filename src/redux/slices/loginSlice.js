import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

const initialState = {
  data: null,
  status: "idle",
  error: "",
};

export const login = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/login", payload);
      return response.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else if (err.request) {
        return rejectWithValue({ message: "No response from server" });
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.data = null;
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;