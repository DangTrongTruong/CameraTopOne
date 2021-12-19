import { Typography } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Loader from "../component/layout/loader/Loader";
import "./ListOrder.css";
import {getOrderDetail, updateStatusOrder} from '../slice/orderSlice';
import Sidebar from "./Sidebar";
import { Link, useParams } from "react-router-dom";
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
const OrderDetail: React.FC = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state: any) => state.authStore);
  const { order, loading,isSuccessStatus,message} = useSelector(
    (state: any) => state.orderStore
  );
  const email = order.shippingInfo.email;
  const [status,setStatus] = useState(order.status || "")
  console.log(order);
  useEffect(() => {
    toast(message)
    dispatch(getOrderDetail({token,id}));
  }, [dispatch,isSuccessStatus]);

  const changeStatusHandler = ()=>{
        dispatch(updateStatusOrder({id,token,status,email}))
  }
  return (
    <div className="productListContainer">
         <Sidebar/>
        { token && <div>
          {loading ? (
        <Loader />
      ) : (
        <div className="productList">
          <h1>List Order</h1>
              <div className="OrderContent">
                <div className="infoOrder">
                  <p><b>ID-Order</b>: {order._id}</p>
                  <p><b>Time Order: </b>{order.createdAt}</p>
                  <p><b>totalPrice Order:</b> {order.totalPrice}</p>
                </div>
                <div className="infoShipping">
                  <p><b>Address:</b> {order.shippingInfo.address}</p>
                  <p><b>City:</b> {order.shippingInfo.city}</p>
                  <p><b>Country:</b> {order.shippingInfo.country}</p>
                  <p><b>Email:</b> {order.shippingInfo.email}</p>
                  <p><b>Phone-Number:</b> {order.shippingInfo.phoneNo}</p>
                </div>
                  <p style={{color: order.status == "pending order" ? "tomato" : "green"}}><b>Status Order:</b> {order.status}</p>
                  <select
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}>
                  <option value={order.status}>{order.status}</option>
                  <option value="Resolve Order">Resolve Order</option>
                  <option value="Reject Order">Reject Order</option>
                  </select>
                  <button onClick={changeStatusHandler}>Submit</button>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name Product</th>
                      <th>Price Product</th>
                      <th>Quantity Product</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems && order.orderItems.map( (item:any) => (
                        <tr>
                          <td>{item._id}</td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
        </div>
      )}
          </div>}
      <ToastContainer />
    </div>
  );
};

export default OrderDetail;
