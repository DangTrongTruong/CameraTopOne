import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrderApi ,getMyOrderApi,getAllOrderApi,getOrderDetailApi,updateStatusOrderApi} from "../api/order";
// tạo và export action để call api product
export const createOrder:any = createAsyncThunk(
    "order/createOrder",
    async (dataForm:any) => {
        console.log(dataForm);
      const { data } = await createOrderApi(dataForm)
      return data;
    }
    );
    export const getMyOrder:any = createAsyncThunk(
      "order/getMyOrder",
      async (token) => {
        const { data } = await getMyOrderApi(token)
        return data;
      }
      );

      export const getAllOrder:any = createAsyncThunk(
        "order/getAllOrder",
        async (token) => {
          const { data } = await getAllOrderApi(token)
          return data;
        }
        );
        export const getOrderDetail:any = createAsyncThunk(
          "order/getOrderDetail",
          async (dataForm) => {
            const { data } = await getOrderDetailApi(dataForm)
            return data;
          }
          );
          export const updateStatusOrder:any = createAsyncThunk(
            "order/updateStatusOrder",
            async (dataForm) => {
              const { data } = await updateStatusOrderApi(dataForm)
              return data;
            }
            );
const orderSlice = createSlice({
    name:"order",
    initialState:{
        loading: false,
        message:"",
        orders:[],
        success:false,
        ordersAdmin:[],
        totalAmount:0,
        order:{},
        isSuccessStatus:false,
    },
    reducers:{

    },
    extraReducers: (builder) =>{
        //createOrder
         builder.addCase(createOrder.fulfilled, (state, action) => {
            state.message = action.payload.message;
            state.loading = false;
          });
          builder.addCase(createOrder.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(createOrder.rejected, (state) => {
            state.message = "Order khong thanh cong";
            state.loading = false;
          });


           //getMyOrder
         builder.addCase(getMyOrder.fulfilled, (state, action) => {
          state.success = action.payload.success;
          state.orders = action.payload.orders;
          state.loading = false;
        });
        builder.addCase(getMyOrder.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(getMyOrder.rejected, (state) => {
          state.message = "Get Order khong thanh cong";
          state.loading = false;
        });


           //getAllOrder
           builder.addCase(getAllOrder.fulfilled, (state, action) => {
            state.success = action.payload.success;
            state.ordersAdmin = action.payload.orders;
            state.totalAmount = action.payload.totalAmount;
            state.loading = false;
          });
          builder.addCase(getAllOrder.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(getAllOrder.rejected, (state) => {
            state.message = "Get All Order khong thanh cong";
            state.loading = false;
          });



           //getOrderDetail
         builder.addCase(getOrderDetail.fulfilled, (state, action) => {
          state.success = action.payload.success;
          state.order = action.payload.order;
          state.loading = false;
        });
        builder.addCase(getOrderDetail.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(getOrderDetail.rejected, (state) => {
          state.message = "Get Order khong thanh cong";
          state.loading = false;
        });

           //updateStatusOrder
           builder.addCase(updateStatusOrder.fulfilled, (state, action) => {
            state.isSuccessStatus = action.payload.success;
            state.loading = false;
          });
          builder.addCase(updateStatusOrder.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(updateStatusOrder.rejected, (state) => {
            state.message = "Update Status Order khong thanh cong";
            state.loading = false;
          });
    }
})

export default orderSlice;