import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getAllProductApi,getProducts,createProductApi,removeProductApi} from "../api/product"
import {dataFormProductList} from '../model/Product'
// tạo và export action để call api product
export const getProductList:any = createAsyncThunk(
  // type action
  "products/getProductList",
  async (dataForm:dataFormProductList) => {
    const { data } = await getAllProductApi(dataForm)
    return data;
  }
  );
  export const getProductHome:any = createAsyncThunk(
    // type action
    "products/getProductHome",
    async () => {
      const { data } = await getProducts()
      return data;
    }
    );

    type createProductFormData ={
      name:string,
      token:string,
      description:string,
      category:any,
      Stock:number,
    }
    export const createProduct:any = createAsyncThunk(
      // type action
      "products/createProduct",
      async (dataForm:createProductFormData) => {
        const { data } = await createProductApi(dataForm)
        return data;
      }
      );

      type removeProduct ={
        id:string,
        token:string
      }
      export const removeProduct = createAsyncThunk(
        // type action
        "products/removeProduct",
        async (dataForm:removeProduct) => {
          
          const { data } = await removeProductApi(dataForm)
          return data;
        }
        );
  

const productSlice = createSlice({
  name: "products",
  reducers:{

  },
  initialState: {
    loading: false,
    products: [],
    productCount:0,
    success: false,
    message:'',
  },
  extraReducers: (builder) => {
    //getProductList
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
      state.loading = false;
    });
    builder.addCase(getProductList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductList.rejected, (state) => {
      state.loading = false;
      state.products =[];
    });

    //getProductHome
    builder.addCase(getProductHome.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
      state.loading = false;
    });
    builder.addCase(getProductHome.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductHome.rejected, (state) => {
      state.loading = false;
      state.products =[];
    });

    //createProduct
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.rejected, (state,action) => {
      state.loading = false;
    });

      //removeProduct
      builder.addCase(removeProduct.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.loading = false;
        state.message = action.payload.message;
      });
      builder.addCase(removeProduct.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(removeProduct.rejected, (state,action) => {
        state.loading = false;
      });
  }
});

export default productSlice;
