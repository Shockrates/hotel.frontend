import React from 'react'
import { Review} from '../types';
import Rating from './Rating';

interface ReviewProps{
  index:number
  review:Review
}

function ReviewComponent({review, index}:ReviewProps) {

  
  return (
    <div className='mb-4'>
      <div className="flex flex-row">
        {index+1}. {review.attributes.user_id} <Rating defaultRating={review.attributes.rate} editable={false} />
      </div>
      <div className="text-sm opacity-50">
        Add time: {new Date(review.attributes.created_at).toLocaleDateString()}
      </div>
      <p>
        {review.attributes.comment}
      </p>
      
    </div>
  )
}

export default ReviewComponent