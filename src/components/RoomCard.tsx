import React from 'react'
import { Room } from '../types'

type roomCardProps = {
    room:Room
}

const RoomCard = ({room}:roomCardProps) => {
  return (
    <article className='my-4 pb-2 border-b border-gray-400'>
        {room.attributes.name}
    </article>
  )
}

export default RoomCard