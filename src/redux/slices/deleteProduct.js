import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";
import Cookies from "js-cookie"

const initialState = {
    data: null,
    status: "idle",
    error: "",
};

export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async (payload, { rejectWithValue }) => {
    try {
        const accessToken = Cookies.get('token');
    const response = await axiosInstance.delete(`product/deleteProduct/${payload.productId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: payload
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

const deleteProductSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteCartItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default deleteProductSlice.reducer;

