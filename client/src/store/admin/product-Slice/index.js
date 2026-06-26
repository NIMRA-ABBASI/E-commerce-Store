import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isLoading:false,
    productList:[]
}

export const addProduct = createAsyncThunk('/product/add',async(formData)=>
{
    const response = await axios.post('http://localhost:3000/api/admin/products/add',formData) 
})

const productSlice = createSlice({
    name: "productSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>
    {

    }
})