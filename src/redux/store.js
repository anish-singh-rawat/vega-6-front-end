import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productsSlice from "./slices/productsSlice";
import GetProductsSlice from "./slices/getProducts";
import loginSlice from "./slices/loginSlice";
import registerSlice from "./slices/registerSlice";
import CartSlice from "./slices/CartSlice";
import deleteProductSlice from "./slices/deleteProduct"
import singleProductSlice from "./slices/SignleProduct"
import updateItemDetailSlice from "./slices/updateProduct"
import placeOderProductSlice from "./slices/PlaceOrder";

const store = configureStore({
  reducer: {
    products: productsSlice,
    getProducts: GetProductsSlice,
    login: loginSlice,
    register: registerSlice,
    cart: CartSlice,
    deleteProducts : deleteProductSlice,
    singleProduct : singleProductSlice,
    updateProduct : updateItemDetailSlice,
    placeOderProduct : placeOderProductSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;
