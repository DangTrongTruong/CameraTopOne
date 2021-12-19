import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDetail } from "../api/product";
import {cartItem} from '../model/Cart'
type dataCart={
  id:string,
  quantity:number
}
export const addItemsToCart = createAsyncThunk(
  // type action
  "cart/addItemsToCart",
  async (dataCart:dataCart) => {
    const {id,quantity} = dataCart
    const { data } = await getProductDetail(id);
    const cart = data.product
    cart.quantity = quantity
    return cart;
  }
);

export const removeItemsFromCart = createAsyncThunk(
  // type action
  "cart/removeItemsFromCart",
  async (id:string) => {
    const { data } = await getProductDetail(id);
    return data.product;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    shippingInfo:{},
  },
  reducers: {
    saveShippingInfo: (state,action)=>{

        state.shippingInfo = action.payload;
    }
  },
  extraReducers: (builder:any) => {
    //add to cart
    builder.addCase(addItemsToCart.fulfilled, (state:any, action:any) => {
        const isItemExist = state.cartItems.find(
            (i:cartItem) => i._id === action.payload._id 
        );
        if(isItemExist){
          if(isItemExist.quantity >= isItemExist.Stock){
             isItemExist.quantity = isItemExist.Stock
          }
            isItemExist.quantity += action.payload.quantity 
            const newCartsItem = state.cartItems.filter((item:cartItem)=>(item._id !== isItemExist._id))
            state.cartItems=[...newCartsItem,isItemExist]

        }
        else{
            state.cartItems=[...state.cartItems,action.payload];
        }
        
      });

      builder.addCase(removeItemsFromCart.fulfilled, (state:any, action:any) => {
            state.cartItems = state.cartItems.filter( (item:cartItem) => item._id !== action.payload._id)
      })
     
  },
});

export const {saveShippingInfo} = cartSlice.actions

export default cartSlice;
