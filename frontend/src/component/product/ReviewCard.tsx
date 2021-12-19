import React from 'react'
import { StarsRating } from "stars-rating-react-hooks";
import {IReviews} from '../../model/Product'
type Props={
  review:IReviews,
}
const ReviewCard:React.FC<Props> = ({review}) => {
    const config = {
        totalStars:5,
        activeColor:"tomato",
        initialSelectedValue:review.rating,
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
    <div className="reviewCard">
      <img src="data:image/jpeg;base64,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" alt="Demo avatar User"/>
        <p>{review.name}</p>
        <StarsRating config={config}/>
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
