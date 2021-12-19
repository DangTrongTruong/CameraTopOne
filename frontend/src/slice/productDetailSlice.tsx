import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getProductDetail,createReview,updateProductApi, getAllReviewsApi} from "../api/product"
import {dataFormReview} from "../model/Product"
// tạo và export action để call api product
export const getProduct:any = createAsyncThunk(
  // type action
  "product/getProduct",
  async (id:string) => {
    const { data } = await getProductDetail(id)
    return data;
  }
  );

export const newReview = createAsyncThunk(
  "product/newReview",
  async (dataForm:dataFormReview) => {
    const { data } = await createReview(dataForm)
    return data;
  }
)

export const updateProduct:any = createAsyncThunk(
  // type action
  "product/updateProduct",
  async (dataForm) => {
    const { data } = await updateProductApi(dataForm)
    return data;
  }
  );

export const getAllReviews:any = createAsyncThunk(
  // type action
  "product/getAllReviews",
  async (id) => {
    const { data } = await getAllReviewsApi(id)
    return data;
  }
)
  
const productDetailSlice = createSlice({
  name: "product",
  reducers:{

  },
  initialState: {
    message: "",
    loading: false,
    product: {},
    success:false,
    reviews:[],
    isSuccessReview:false,
   
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload.product;
      state.loading = false;
    });
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    //update Product 
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      console.log("fullfilled action", action.payload);
      state.product = action.payload.product;
      state.loading = false;
      state.message =action.payload.message;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.loading = true;
     
    });
    //review
    builder.addCase(newReview.fulfilled, (state, action) => {
      state.isSuccessReview = action.payload.success;
      state.loading = false;
    });
    builder.addCase(newReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(newReview.rejected, (state,action) => {
      state.loading = false;
    });

    //getAllReviews
    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.reviews = action.payload.reviews;
      state.loading = false;
    });
    builder.addCase(getAllReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllReviews.rejected, (state) => {
      state.loading = false;
    });
  }
});

export default productDetailSlice;
