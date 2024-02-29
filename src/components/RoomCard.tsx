import React, { useState } from 'react'
import { Room } from '../types'
import { Modal, ModalBody } from 'flowbite-react'



type roomCardProps = {
   
  room:Room
}

const RoomCard = ({room}:roomCardProps) => {
  return (
    <article className='my-4 pb-2 border-b border-gray-400'>
      <div className="flex">
        <div className="block h-auto w-1/4">
          <img src={`assets/images/rooms/${room.attributes.photo_url}`} alt={`${room.attributes.photo_url}`} height="auto"/>
        </div>
        <div className="relative w-4/5 ml-4 pl-6 box-border border-l-4 border-orange-500 text-left">
          <h1 className='text-4xl font-bold'>{room.attributes.name}</h1>
          <p className='text-neutral-500 font-semibold text-2xl'>{room.attributes.city}, {room.attributes.area}</p>
          <p>{room.attributes.description_short}</p>
          <div className="flex justify-end w-full text-right mt-6">
            <button className='flex bg-orange-500 items-center justify-center text-white text-base h-7 rounded-md px-1 py-5 my-1'>
              <span>Go to room Page</span>
            </button>
          </div>
        </div>
      </div>
      
        
    </article>
  )
}

export default RoomCard


