import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addProduct = createAsyncThunk("/product/add", async (formData) => {
  const response = await axios.post(
    "http://localhost:3000/api/admin/products/add",
    formData,
    {headers: {'Content-Type': 'application/json'}} ,
  );

  return response?.data;
});

export const fetchAllProducts = createAsyncThunk("/product/get", async () => {
  const response = await axios.get(
    "http://localhost:3000/api/admin/products/get",
    {headers: {'Content-Type': 'application/json'}} ,
  );

  return response?.data;
});

export const editProduct = createAsyncThunk("/product/edit", async ({id,formData}) => {
  const response = await axios.put(
    `http://localhost:3000/api/admin/products/edit/${id}`,formData,
    {headers: {'Content-Type': 'application/json'}} ,
  );

  return response?.data;
});

export const deleteProduct = createAsyncThunk("/product/delete", async (id) => {
  const response = await axios.delete(
    `http://localhost:3000/api/admin/products/delete/${id}`,
    {headers: {'Content-Type': 'application/json'}} ,
  );

  return response?.data;
});


const productSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
        state.isLoading=true;
    }).addCase(fetchAllProducts.fulfilled, (state,action) => {
        state.isLoading=false;
        state.productList = action.payload.data;
    }).addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading=false;
        state.productList = [];
    })
  },
});

export default productSlice.reducer;
