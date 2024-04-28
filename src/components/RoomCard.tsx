import React, { useState } from 'react'
import { Booking, Room } from '../types'
import { Modal, ModalBody } from 'flowbite-react'
import { Link } from 'react-router-dom'



type roomCardProps = {
   
  room:Room
  booking?:Booking
}

const RoomCard = ({room}:roomCardProps) => {
  return (
    <article className='my-4 pb-2 border-b border-gray-400'>
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row">
          <div className="block h-auto sm:w-1/4 w-full">
            <img src={`assets/images/rooms/${room.attributes.photo_url}`} alt={`${room.attributes.photo_url}`} height="auto"/>
          </div>
          <div className="relative w-full sm:w-3/4 sm:ml-4 sm:pl-6 box-border sm:border-l-4 sm:border-orange-500 text-left">
            <h1 className='text-4xl font-bold'>{room.attributes.name}</h1>
            <p className='text-neutral-500 font-semibold text-2xl'>{room.attributes.city}, {room.attributes.area}</p>
            <p>{room.attributes.description_short}</p>
            <div className="flex justify-end w-full text-right mt-6">
              
              {/* <button className='flex bg-orange-500 items-center justify-center text-white text-base h-7 rounded-md px-1 py-5 my-1'>
                <span>Go to room Page</span>
              </button> */}
            <Link to={`/room/${room.id}`}>
              <button className='flex bg-orange-500 items-center justify-center text-white text-base h-7 rounded-md px-1 py-5 my-1'>
                Go to room Page
              </button>
            </Link>

            </div>
          </div>
        </div>
        <div className="flex mt-5">
          <div className="w-full sm:w-1/4 bg-gray-600 text-lg font-semibold text-white py-1">
            <p>Total Cost: {room.attributes.price}€</p>
          </div>  
          <div className="flex w-full  sm:w-3/4 sm:ml-4 sm:pl-6 bg-gray-100 text-lg text-gray-800 py-1 rounded-sm">
            <div className="mx-auto px-2">
              <p>Count of Guests: {room.attributes.count_of_guests}</p>
            </div>
            <div className="border-l-2 border-gray-400"></div>
            <div className="mx-auto px-2">
              <p>Room Type: {room.attributes.type}</p>
            </div>
            
          </div>  
        </div>
      </div>
     
      
        
    </article>
  )
}

export default RoomCard


