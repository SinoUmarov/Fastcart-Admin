import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

import { axiosRequest } from '../../api/axiosRequest'

export const getSubCategory = createAsyncThunk(
  "subCategory/getSubCategory",
  async () => {
    try {
      let { data } = await axiosRequest.get(`/SubCategory/get-sub-category`);
      toast.success("Sub Category Get Successfully", { autoClose: 1000 });
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteSubCategory = createAsyncThunk(
  "subCategory/deleteSubCategory",
  async (id, { dispatch }) => {
    let token = localStorage.getItem("Admin");
    try {
      await axiosRequest.delete(`/SubCategory/delete-sub-category?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Sub Category removed Successfully", { autoClose: 1000 });
      dispatch(getSubCategory());
    } catch (error) {
      toast.error("Here Something Incorrect", { autoClose: 1000 });
      console.error(error);
    }
  }
);

export const editSubCategory = createAsyncThunk(
  "subCategory/editSubCategory",
  async (elem, { dispatch }) => {
    let token = localStorage.getItem("Admin");
    try {
      await axiosRequest.put(
        `/SubCategory/update-sub-category?Id=${elem.id}&CategoryId=${elem.CatId}&SubCategoryName=${elem.name}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Edit Sub Category Successfully", { autoClose: 1000 });
      dispatch(getSubCategory());
    } catch (error) {
      console.error(error);
      toast.error("Here Something Incorrect", { autoClose: 1000 });
    }
  }
);

export const addSubCategory = createAsyncThunk(
  "subCategory/addSubCategory",
  async (category, { dispatch }) => {
    let token = localStorage.getItem("Admin");
    try {
      await axiosRequest.post(
        `/SubCategory/add-sub-category?CategoryId=${category.id}&SubCategoryName=${category.name}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(getSubCategory());
      toast.success("Add Category Successfully", { autoClose: 1000 });
    } catch (error) {
      toast.error("Here Something Incorrect", { autoClose: 1000 });
      console.error(error);
    }
  }
);

export const SubCategory = createSlice({
  name: "subCategory",
  initialState: {},
  reducers: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getSubCategory.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default SubCategory.reducer;
