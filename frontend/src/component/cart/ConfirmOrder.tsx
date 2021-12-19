import React, { Fragment } from "react";
import CheckoutSteps from "../cart/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {cartItem} from '../../model/Cart'
import { createOrder } from "../../slice/orderSlice";
const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state:any) => state.cartStore);
  const { user ,token } = useSelector((state:any) => state.authStore);
  const subtotal = cartItems.reduce(
      (acc:number,item:cartItem) => acc + item.quantity * item.price ,
      0
  )

  const shippingCharges = subtotal > 5000 ? 0 : 200;

  const totalPrice = subtotal + shippingCharges

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`

  const data={
      token,
      itemsPrice:subtotal,
      shippingPrice:shippingCharges,
      totalPrice:totalPrice,
      orderItems:cartItems,
      shippingInfo:shippingInfo
  }


  const submitOderHandler = () =>{
        dispatch(createOrder(data))
        navigate("/orders")
  }
  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Thông tin người nhận</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Tên:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Email:</p>
                <span>{shippingInfo.email}</span>
              </div>
              <div>
                <p>Số điện thoại:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Địa chỉ:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Sản phẩm đã chọn:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item:any) => (
                  <div key={item._id}>
                    <img src={item.images[0].url} alt="Product" />
                    <Link to={`/product/${item._id}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X {item.price} $ ={" "}
                      <b>{item.price * item.quantity} $</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Hoá đơn</Typography>
            <div>
              <div>
                <p>Tổng tiền sản phẩm</p>
                <span>{subtotal} $</span>
              </div>
              <div>
                <p>Phí chuyển hàng</p>
                <span>{shippingCharges} $</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Tổng hoá đơn phải thanh toán</b>
              </p>
              <span>{totalPrice} $</span>
            </div>

            <button onClick={submitOderHandler} >Xác nhận thanh toán</button>
          </div>
        </div>
      </div>
    </Fragment>

  );
};

export default ConfirmOrder;
