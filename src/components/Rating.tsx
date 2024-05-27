import React from 'react';
import { useState } from 'react';

type ratingProps = {
   count?:number,
   defaultRating?:number,
   icon?:string,
   color?: string,
   unselectedColor?: string,
   editable: boolean
  }

export default function Rating({count=5, defaultRating=0, icon="★", color="orange", unselectedColor="grey", editable }: ratingProps ) {

    const [rating, setRating] = useState(defaultRating);
    const [hoverRating, setHoverRating] = useState(0);

    let stars = Array(count).fill(icon);
    const handleClick = (rating: number) => {
      setRating(rating);
      //Testing 
      localStorage.setItem("starRating", `${rating}`)
    }
  return (
    <div className='flex'>
        {stars.map((item, index) => {

          const isActiveColor = (rating || hoverRating) && ((index < rating && hoverRating==0)|| index < hoverRating);

          let elementColor = unselectedColor;

          if (isActiveColor ) {
            elementColor = color
          } 

            return(
              <>
              {
                editable ? (
                  <div className="cursor-pointer transition duration-100 ease-linear hover:scale-125 text-6xl" 
                      key={index} 
                      style={{color:elementColor}}
                      onMouseEnter={() => setHoverRating(index+1)}
                      onMouseOut={() => setHoverRating(0)}
                      onClick={() => handleClick(index+1)}
                    >
                    {icon}
                </div>
                ) : (
                  <div className="text-3xl" 
                      key={index} 
                      style={{color:elementColor}}
                    >
                    {icon}
                </div>
                )
              }
                
              </>
                
            )
        })}
    </div>
  )
}
