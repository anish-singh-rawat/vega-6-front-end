import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";
const initialState = {
    posts: [],
    status: "idle",
    error: "",
};

export const GetProduct = createAsyncThunk("product/AllProduct", async (payload,{ rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("product/AllProduct");
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

const GetProductsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(GetProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(GetProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
            })
            .addCase(GetProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default GetProductsSlice.reducer;
