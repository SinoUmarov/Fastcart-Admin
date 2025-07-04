import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { axiosRequest } from '../../api/axiosRequest'

export const getBrands = createAsyncThunk("brand/getBrands", async () => {
  try {
    let { data } = await axiosRequest.get(`/Brand/get-brands`);
    toast.success("Brands Get Successfully", { autoClose: 1000 });
    return data.data;
  } catch (error) {
    toast.error("Here Something Incorrect", { autoClose: 1000 });
    console.error(error);
  }
});

export const addBrand = createAsyncThunk(
  "brand/addBrand",
  async (nameBrand, { dispatch }) => {
    let token = localStorage.getItem("Admin");
    try {
      await axiosRequest.post(
        `/Brand/add-brand?BrandName=${nameBrand}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(getBrands());
      toast.success("Add Brands Successfully", { autoClose: 1000 });
    } catch (error) {
      toast.error("Here Something Incorrect", { autoClose: 1000 });
      console.error(error);
    }
  }
);

export const deleteBrnad = createAsyncThunk(
  "brand/deleteBrand",
  async (id, { dispatch }) => {
    let token = localStorage.getItem("Admin");
    try {
      await axiosRequest.delete(`/Brand/delete-brand?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Brands removed Successfully", { autoClose: 1000 });
      dispatch(getBrands());
    } catch (error) {
      toast.error("Here Something Incorrect", { autoClose: 1000 });
      console.error(error);
    }
  }
);

export const editBrand = createAsyncThunk(
  "brand/editBrand",
  async (elem , {dispatch}) => {
    let token = localStorage.getItem("Admin");
    try {
      await axiosRequest.put(`/Brand/update-brand?Id=${elem.id}&BrandName=${elem.name}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Edit Brand Successfully", { autoClose: 1000 });
      dispatch(getBrands())
    } catch (error) {
      console.error(error);
      toast.error("Here Something Incorrect", { autoClose: 1000 });
    }
  }
);

export const Brand = createSlice({
  name: "brand",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default Brand.reducer;
