import { Link, Typography } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getMyOrder } from "../../slice/orderSlice";
import Loader from "../layout/loader/Loader";
import "./MyOrder.css";
const MyOrder: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: any) => state.authStore);
  const { orders, loading ,isSuccessStatus,message} = useSelector(
    (state: any) => state.orderStore
  );
  useEffect(() => {
    dispatch(getMyOrder(token));
  }, [dispatch,isSuccessStatus,message]);
  return (
    <div className="productListContainer">
        { token && <div>
          {loading ? (
        <Loader />
      ) : (
        <div className="productList">
          <h1>My Order</h1>
          {orders &&
            orders.map((order: any) => (
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
        </div>
      )}
          </div>}
      <ToastContainer />
    </div>
  );
};

export default MyOrder;
