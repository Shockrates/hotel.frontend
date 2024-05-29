import { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { getRoom } from '../lib/apiCalls';
import { Room } from '../types';
import Rating from '../components/Rating';
import { FaHeart } from "react-icons/fa6";
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../lib/apiClient';



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
    const { user, csrfToken } = useAuth();
    
    const [isFavorite, setIsFavorite] = useState((
      user?.relationships.favorites.find(favorite => favorite.id == room.id) ? true : false
    ))
    let favoriteColor = (isFavorite) ? "yellow" : "white"
    //Testing for rating TO BE DELETED
    
    console.log(isFavorite);
    
  
    const defaultRating:number  = parseInt(localStorage.getItem("starRating") || '0'); 

   const handleFavorite = async () => {
      try {
        await csrfToken();
        await apiClient.post(`api/room/${room.id}/favorite`)
        .catch(err => console.log(err.response.data.message));
      } catch (error) {
        console.log(error);
      }
    };

 

    //End of Testing  
    
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full items-center bg-orange-500 rounded mb-4 px-2 py-1 text-left font-semibold text-white">
          {room.attributes.name} - {room.attributes.city}, {room.attributes.area} | <Rating defaultRating={room.attributes.avg_reviews} editable={false} /> | <FaHeart size={24} color={favoriteColor} onClick={handleFavorite}/>
        </div> 
        <div className="">
        <Rating defaultRating={defaultRating} editable={true} /*count={3}*//>
        </div>
       
    </div>
    
    </>
  
  )
}

export default RoomDetails