import React from 'react'
import {Link} from "react-router-dom"
import { StarsRating } from "stars-rating-react-hooks";
import { IProduct } from '../../model/Product'
type Props = {
  product:IProduct;
 
}
const ProductCard: React.FC<any>= ({product}) => {
  
      const config = {
        totalStars: 5,
        initialSelectedValue: product.ratings,
        renderFull: (
          <img src="https://img.icons8.com/ios-filled/15/FF6347/star--v1.png" />
        ),
        renderEmpty: (
          <img src="https://img.icons8.com/ios/15/FF6347/star--v1.png" />
        ),
        renderHalf: (
          <img src="https://img.icons8.com/ios-filled/15/FF6347/star-half-empty.png" />
        )
      };
  return (
    <div>
      <Link className="productCard" to={`/product/${product._id}`}>
          
            <img src={product.images[0].url}/>
            <p>{product.name}</p>
            <div>
                <StarsRating config={config}/>
                <span>{product.numOfReviews} view</span>
            </div>
            <span>{product.price}$</span>
      </Link>
    </div>
  )
}

export default ProductCard
