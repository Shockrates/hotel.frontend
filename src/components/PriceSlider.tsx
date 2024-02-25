import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

type SliderProps = {
    

    step:number,
    initialMin:number,
    initialMax:number,
    min: number,
    max: number,
    priceCap:number
  

}

export const PriceSlider = ({initialMin, initialMax,  min, max, step, priceCap}: SliderProps) => {

    const { register, setValue } = useFormContext()
    const progressRef = useRef<HTMLDivElement>(null);
    const [minValue, setMinValue] = useState(initialMin);
    const [maxValue, setMaxValue] = useState(initialMax);

    const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (maxValue - minValue >= priceCap && maxValue <= max) {
        if (parseInt(e.target.value) > maxValue) {
        } else {
            setMinValue(parseInt(e.target.value));
            setValue('minPrice', parseInt(e.target.value));
        }
        } else {
        if (parseInt(e.target.value) < minValue) {
            setMinValue(parseInt(e.target.value));
            setValue('minPrice', parseInt(e.target.value));
        }
        }
    };

    const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (maxValue - minValue >= priceCap && maxValue <= max) {
        if (parseInt(e.target.value) < minValue) {
        } else {
            setMaxValue(parseInt(e.target.value));
            setValue('maxPrice', parseInt(e.target.value));
        }
        } else {
        if (parseInt(e.target.value) > maxValue) {
            setMaxValue(parseInt(e.target.value));
            setValue('maxPrice', parseInt(e.target.value));
        }
        }
    };

    useEffect(() => {
        if (progressRef.current !== null) {
            progressRef.current.style.left = (minValue / max) * 100 + "%";
            
            progressRef.current.style.right = 100 - (maxValue / max) * 100 + "%";
        }
      }, [minValue, maxValue, max, step]);

  return (
    <div className='flex flex-col w-full'>
        RangeSlider
        <div className="flex justify-between items-center my-6">
            <div className="rounded-md">
                <span className='p-2 font-semibold'>Min</span>
                <input 
                    
                    type="number" 
                    value={minValue}
                    className='w-24 rounded-md border border-gray-400'
                    {...register("minPrice",
                        {onChange: (e) => setMinValue(e.target.value)}
                    )}
                    
                />
            </div>
            <div className="mx-2 font-semibold text-lg"> - </div>
            <div className=" ">
                <span className="p-2 font-semibold"> Max</span>
                <input
                
                type="number"
                value={maxValue}
                className="w-24 rounded-md border border-gray-400"
                {...register("maxPrice",
                    {onChange: (e) => setMaxValue(e.target.value)}
                )}
                />
          </div>
        </div>

        {/* Slider */}
        
        <div className="mb-4">

          <div className="relative h-1 rounded-md bg-gray-300">
            <div className="absolute h-full bg-blue-600 rounded-md "ref={progressRef}></div>
          </div>

          <div className="range-input relative">
            <input
              onChange={handleMin}
              type="range"
              min={min}
              step={step}
              max={max}
              value={minValue}
              className="absolute w-full bottom-0 left-0 -top-1  h-1   bg-transparent  appearance-none pointer-events-none"
            />

            <input
              onChange={handleMax}
              type="range"
              min={min}
              step={step}
              max={max}
              value={maxValue}
              className="absolute w-full bottom-0 left-0 -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
            />
          </div>
        </div>
      </div>
  )
}
