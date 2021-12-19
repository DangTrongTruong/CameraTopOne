import { Typography } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Loader from "../component/layout/loader/Loader";
import "./ListOrder.css";
import {getAllOrder} from '../slice/orderSlice';
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
const ListOrder: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: any) => state.authStore);
  const { ordersAdmin, loading, success ,totalAmount,isSuccessStatus} = useSelector(
    (state: any) => state.orderStore
  );
  console.log(ordersAdmin);
  useEffect(() => {
    dispatch(getAllOrder(token));
  }, [dispatch,isSuccessStatus]);
  return (
    <div className="productListContainer">
         <Sidebar/>
        { token && <div>
          {loading ? (
        <Loader />
      ) : (
        <div className="productList">
          <h1>List Order</h1>
          {ordersAdmin &&
            ordersAdmin.map((order: any) => (
              <div className="OrderContent">
                <div className="infoOrder">
                  <p><b>ID-Order</b>: {order._id}</p>
                  <p><b>Time Order: </b>{order.createdAt}</p>
                  <p style={{color: order.status == "pending order" ? "tomato" : "green"}}><b>Status Order:</b> {order.status}</p>
                  <p><b>totalPrice Order:</b> {order.totalPrice}</p>
                </div>
                <div className="infoShipping">
                  <p><b>Address:</b> {order.shippingInfo.address}</p>
                  <p><b>City:</b> {order.shippingInfo.city}</p>
                  <p><b>Country:</b> {order.shippingInfo.country}</p>
                  <p><b>Email:</b> {order.shippingInfo.email}</p>
                  <p><b>Phone-Number:</b> {order.shippingInfo.phoneNo}</p>
                </div>
                  <Link className="link-Detail" to={`/admin/order/detail/${order._id}`}>Detail Order</Link>
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
            ))}
            <div className="totalPriceOrders">
                    <p>TotalAmount: {ordersAdmin && totalAmount} $</p>
            </div>
        </div>
      )}
          </div>}
      <ToastContainer />
    </div>
  );
};

export default ListOrder;
