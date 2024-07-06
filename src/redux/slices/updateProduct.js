import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";
import Cookies from "js-cookie"

const initialState = {
    data: null,
    status: "idle",
    error: "",
};

export const updateCartDetails = createAsyncThunk("product/updateProduct", async (payload, { rejectWithValue }) => {
    try {
        const accessToken = Cookies.get('token');
        const response = await axiosInstance.put(`product/updateProduct/${payload.productId}`, payload, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
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

const updateItemDetailSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateCartDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCartDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(updateCartDetails.rejected, (state, action) => {
                state.status = "failed";
                state.data = action.payload;
            });
    },
});

export default updateItemDetailSlice.reducer;

