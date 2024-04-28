import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { getRoom } from '../lib/apiCalls';
import { Room } from '../types';


type RoomLoaderResponse = Awaited<ReturnType<typeof roomDetailsLoader>>;

//loader
export async function roomDetailsLoader({params}:any){

    
    if (!params.id) {
        throw new Error("The room you try to find does not exist");
    }
    const id = params.id
    const room = getRoom(id)

    return room;
}

function RoomDetails() {

    const room = useLoaderData() as Room;
    
  return (
    <div className="flex flex-col sm:flex-row w-full">
        Room {room.attributes.name}
    </div>
  )
}

export default RoomDetails