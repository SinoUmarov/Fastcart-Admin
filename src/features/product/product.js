import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { axiosRequest } from '../../api/axiosRequest'

export const API = import.meta.env.VITE_API_URL;


export const getProduct = createAsyncThunk("product/getProduct", async () => {
  try {
    const { data } = await axiosRequest.get(`/Product/get-products`);
    toast.success("Products fetched successfully", { autoClose: 1000 });
    return data.data;
  } catch (error) {
    toast.error("Something went wrong while fetching products!", { autoClose: 2000 });
    throw error;
  }
});

export const getProductById = createAsyncThunk("product/getProductById", async (id) => {
  try {
    const { data } = await axiosRequest.get(`/Product/get-product-by-id?id=${id}`);
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});


export const getColor = createAsyncThunk("product/getColor", async () => {
  try {
    const { data } = await axiosRequest.get(`/Color/get-colors`);
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});


export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id, { dispatch }) => {
  const token = localStorage.getItem("Admin");
  try {
    await axiosRequest.delete(`/Product/delete-product?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Product deleted successfully", { autoClose: 1000 });
    dispatch(getProduct());
  } catch (error) {
    toast.error("Failed to delete product", { autoClose: 1000 });
    console.error(error);
    throw error;
  }
});


export const AddProducts = createAsyncThunk("product/AddProduct", async (elem, { dispatch }) => {
  const token = localStorage.getItem("Admin");
  try {
    await axiosRequest.post(`/Product/add-product`, elem, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Product added successfully", { autoClose: 2000 });
    dispatch(getProduct());
  } catch (error) {
    toast.error("Failed to add product", { autoClose: 2000 });
    console.error(error);
    throw error;
  }
});


export const deleteImage = createAsyncThunk("product/deleteImage", async (id) => {
  const token = localStorage.getItem("Admin");
  try {
    await axiosRequest.delete(`/Product/delete-image-from-product?imageId=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Image deleted successfully", { autoClose: 2000 });
  } catch (error) {
    toast.error("Failed to delete image", { autoClose: 2000 });
    console.error(error);
    throw error;
  }
});


export const addImages = createAsyncThunk("product/addImages", async (files) => {
  const token = localStorage.getItem("Admin");
  try {
    await axiosRequest.post(`/Product/add-image-to-product`, files, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Image(s) added successfully", { autoClose: 2000 });
  } catch (error) {
    toast.error("Failed to add image(s)", { autoClose: 2000 });
    console.error(error);
    throw error;
  }
});


export const editProduct = createAsyncThunk("product/editProduct", async (formData, { rejectWithValue }) => {
  const token = localStorage.getItem("Admin");

  try {
    const res = await axiosRequest.put(`/Product/update-product`, formData,{},{
      headers: {
        Authorization: `Bearer ${token}`,
      
      },
    });

    toast.success("Product updated successfully");
    return res.data;
  } catch (error) {
    toast.error("Failed to update product");
    return rejectWithValue(error.response?.data || error.message);
  }
});




export const Products = createSlice({
  name: "product",
  initialState: {
    data: [],
    dataId: null,
    dataCol: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.dataId = action.payload;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.dataCol = action.payload;
      });
  },
});

export default Products.reducer;
