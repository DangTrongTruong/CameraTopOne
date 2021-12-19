import React from "react";
import CartItemCard from "./CartItemCard";
import "./Cart.css";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../slice/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import {cartItem} from '../../model/Cart'
const Cart:React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { cartItems } = useSelector((state:any) => state.cartStore);
  console.log(cartItems);
  const increaseQuantity = (id:string, quantityItem:number, stock:number) => {
    const quantity = 1;
    if (stock <= quantityItem) {
      toast("Vượt quá số lượng trong kho");
      return;
    }
    dispatch(addItemsToCart({id,quantity}));
  };

  const decreaseQuantity = (id:string, quantityItem:number, stock:number) => {
    const quantity =  -1;
    if (1 >= quantityItem) {
      toast("Số lượng mua hàng không nhỏ hơn 1 sản phẩm");
      return;
    }
    dispatch(addItemsToCart({id,quantity}));
  };

  const deleteCartItems = (id:string) => {
    dispatch(removeItemsFromCart(id));
  };

  const priceTotal = cartItems.reduce((acc:any,item:any)=>{
      return acc + item.price * item.quantity;
  },0)

  const checkoutHandler = ()=>{
    navigate("/login?redirect=shipping")
  }
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <p>Không có sản phẩm nào trong giỏ hàng</p>
          <Link to="/products">Sản phẩm</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Sản phẩm</p>
              <p>Số lượng</p>
              <p>Tổng tiền sản phẩm</p>
            </div>

            {cartItems &&
              cartItems.map((item:cartItem) => (
                <div className="cartContainer">
                   {console.log(item)}
                  <div>
                    <CartItemCard
                      key={item._id}
                      item={item}
                      deleteCartItems={deleteCartItems}
                    />
                  </div>
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item._id,
                          item.quantity,
                          item.Stock
                        )
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item._id,
                          item.quantity,
                          item.Stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <p className="cartSubtotal">
                      {`${item.price * item.quantity}`} $
                    </p>
                  </div>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Tồng tiền hoá đơn</p>
                <p>{priceTotal}$</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler} >Check Out</button>
              </div>
            </div>
          </div>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
