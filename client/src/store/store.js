import { configureStore } from "@reduxjs/toolkit";
import authSlice from './auth-Slice'
import productSlice from './admin/product-Slice/index'
const store = configureStore({
    reducer:{
        auth:authSlice,
        adminProduct:productSlice,
    }
})

export default store;