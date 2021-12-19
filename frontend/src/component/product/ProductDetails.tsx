import React, { Fragment, useEffect, useState } from 'react'
import { IProduct } from '../../model/Product'
import {useParams} from "react-router-dom"
import { StarsRating } from "stars-rating-react-hooks";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./ProductDetails.css"
import ReviewCard from '../product/ReviewCard'
import {IReviews} from '../../model/Product'
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/loader/Loader';
import {getProduct, newReview} from "../../slice/productDetailSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addItemsToCart } from '../../slice/cartSlice';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import {idParams} from '../../model/Product'


const ProductDetail:React.FC= () => {
  let { id }:idParams = useParams();
  const productId = id;
    const dispatch = useDispatch()
    const [quantity,setQuantity] = useState(1);
    const [open,setOpen] = useState(false);
    const [rating,setRating] = useState<number>(0);
    const [comment,setComment] = useState('')
    const {product,loading,isSuccessReview} = useSelector((state:any) => state.productDetailStore)
    const {token} = useSelector( (state:any) =>state.authStore)
    useEffect(()=>{
      if(isSuccessReview){
        toast('review successfully')
      }
        dispatch(getProduct(id))
      },[dispatch,id,isSuccessReview ]
        )
      
    const increaseQuantity = () =>{
      if(product.Stock <= quantity){
        toast("Số lượng mua lớn hơn số lượng sản phẩm tồn kho")
      }
      else{
        setQuantity(quantity + 1)
      }
    }

    const decreaseQuantity = () =>{
      if(1 >= quantity){
        toast("Số lượng mua không nhỏ hơn 1 sản phẩm")
      }
      else{
        setQuantity(quantity - 1)
      }
    }
    const data={
      id,
      quantity
    }
    const handleAddToCard = ()=>{
      dispatch(addItemsToCart(data));
      toast("ADD TO CART SUCCESSFULLY")
    }
    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };
  
  
    const reviewSubmitHandler = () => {
  
      dispatch(newReview({rating,comment,productId,token}));
  
      setOpen(false);
    };
    
    const configStars = {
      totalStars:5,
      initialSelectedValue:product.ratings,
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
   <Fragment>
       {loading ? <Loader/> : 
        <>
        <MetaData title="DETAIL PRODUCT"/>
         <div className="ProductDetails">
             <div>  
                   <Carousel >
                   {
                           product.images && 
                           product.images.map( (image:IProduct,index:IProduct) =>(
                           
                           <div>
                             <img className="CarouselImage"
                               key={image.url}
                               src={image.url}
                               alt={`${index} Slide`}
                           />
                           </div>
                             
                           ))
                       }
                    </Carousel>
             </div>
             <div>
               <div className="detailsBlock-1">
                       <h2>{product.name}</h2>
               </div>
               <div className="detailsBlock-2">
                      <StarsRating config={configStars}/>
                       <span>({product.numOfReviews} Reviews )</span>
               </div>
               <div className="detailsBlock-3">
                 <h1>{product.price} $</h1>
                   <div className="detailsBlock-3-1">
                       <div className="detailsBlock-3-1-1">
                           <button onClick={decreaseQuantity}>-</button>
                           <input value={quantity} readOnly type="number"/>
                           <button onClick={increaseQuantity}>+</button>
                       </div>
                       <button onClick={handleAddToCard}>Add to Card</button>
                   </div>
                   <p>
                     Hàng trong kho:
                     <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                       {product.Stock < 1 ? "Hết hàng" : "Còn hàng"}
                     </b>
                   </p>
               </div>
    
               <div className="detailsBlock-4">
                       Description: <p>{product.description}</p>
               </div>
               <button className="submitReview" onClick={submitReviewToggle}>Submit Review</button>
             </div>
         </div>
    
                   <h3 className="reviewsHeading">NGƯỜI DÙNG ĐÁNH GIÁ</h3>
                   <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e:any) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
         {product.reviews && product.reviews[0] ? (
           <div className="reviews">
             {product.reviews && product.reviews.map( (review:IReviews,index:number) => <ReviewCard key={index} review={review}/>)}
           </div>
         ):(
           <p className="noReviews">Sản phẩm chưa có đánh giá</p>
         )}
          </>
       }
        <ToastContainer />
   </Fragment>
  )
 
}

export default ProductDetail
