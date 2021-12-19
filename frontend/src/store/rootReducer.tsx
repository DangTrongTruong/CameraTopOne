import { combineReducers } from "redux";
import productSlice from "../slice/productSlice" 
import productDetailSlice from "../slice/productDetailSlice" 
import authSlice from "../slice/authSlice"
import cartSlice from "../slice/cartSlice";
import orderSlice from "../slice/orderSlice";
const rootReducer = combineReducers({
    productStore: productSlice.reducer,
    productDetailStore: productDetailSlice.reducer,
    authStore:authSlice.reducer,
    cartStore:cartSlice.reducer,
    orderStore:orderSlice.reducer,
})

export default rootReducer