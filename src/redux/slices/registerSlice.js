import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

const initialState = {
  data: null,
  status: "idle",
  error: "",
};

export const register = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("auth/register", payload);
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

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = "";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.data = null;
        state.error = action.payload;
      });
  },  
});

export default registerSlice.reducer;