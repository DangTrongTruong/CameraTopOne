import React from 'react'
import { Link } from 'react-router-dom'
import "./CartItemCard.css"
import {cartItem} from '../../model/Cart'
type Props = {
  item:cartItem,
  deleteCartItems:any
}
const CartItemCard:React.FC<any> = ({item,deleteCartItems}) => {
  return (
    <div className="CartItemCard">
      <img src={item.images[0].url} alt="demo"/>
      <div>
          <Link to={`/product/${item._id}`}>{item.name}</Link>
            <span>{`Price:${item.price} $`}</span>
            <p onClick={()=>deleteCartItems(item._id)}>Remove</p>
      </div>
    </div>
  )
}

export default CartItemCard
