import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { getRoom } from '../lib/apiCalls';
import { Room } from '../types';
import Rating from '../components/Rating';


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

    //Testing for rating TO BE DELETED
    const defaultRating:number  = parseInt(localStorage.getItem("starRating") || '0');   
    
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="w-full bg-orange-500 rounded mb-4 px-2 py-1 text-left font-semibold text-white">
          {room.attributes.name}
        </div> 
        <div className="">
        <Rating defaultRating={defaultRating} /*count={3}*//>
        </div>
       
    </div>
    
    </>
  
  )
}

export default RoomDetails