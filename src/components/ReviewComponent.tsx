import React from 'react'
import { Review} from '../types';
import Rating from './Rating';

interface ReviewProps{
  index:number
  review:Review
}

function ReviewComponent({review, index}:ReviewProps) {

  
  return (
    <div>
      <div className="flex flex-row">
        {index+1}. {review.attributes.user_id} <Rating defaultRating={review.attributes.rate} editable={false} />
      </div>
      <div className="">
        Add time: {new Date(review.attributes.created_at).toLocaleDateString()}
      </div>
      
    </div>
  )
}

export default ReviewComponent