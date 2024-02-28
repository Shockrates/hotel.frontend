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
      </div>
        {room.attributes.name}
    </article>
  )
}

export default RoomCard


