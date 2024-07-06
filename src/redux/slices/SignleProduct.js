import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";
const initialState = {
    data: [],
    status: "idle",
    error: "",
};

export const singleProduct = createAsyncThunk("product/getProduct/", async (id,{ rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`product/getProduct/${id}`);
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

const singleProductSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(singleProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(singleProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(singleProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default singleProductSlice.reducer;
