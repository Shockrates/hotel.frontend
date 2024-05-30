import { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { getRoom } from '../lib/apiCalls';
import { Favorite, Room } from '../types';
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
    const { user, setUserToLocalStorage } = useAuth();
    
    //If User  exists on Local Storage will AND room.id is found in Users Favorites isFavorite will be set to true else it will be faalse
    const [isFavorite, setIsFavorite] = useState((
      user?.relationships.favorites.find(favorite => favorite.room_id == room.id) ? true : false
    ))

    //Sets collor depending if room is favorite to autherticated user 
    let favoriteColor = (isFavorite) ? "yellow" : "white"
 
    
  
  const defaultRating:number  = parseInt(localStorage.getItem("starRating") || '0'); 

  const handleFavorite = async () => {
    try {
      //If no user return
      if (!user)
        return

      if (!isFavorite) {
        setIsFavorite(true);
        await apiClient.post(`api/room/${room.id}/favorite`)
        .then(response => {
          user.relationships.favorites.push({'room_id': room.id!, 'name':room.attributes.name}); 
          setUserToLocalStorage(user);
        })
        .catch(err => 
          {
            console.log(err.response.data.message);
            
          });
      } else {
        setIsFavorite(false);
        await apiClient.delete(`api/room/${room.id}/favorite`)
        .then(response => {
          user.relationships.favorites = user.relationships.favorites.filter(favorite => favorite.room_id !== room.id)
          setUserToLocalStorage(user);
          console.log(user);
          
        })
        .catch(err => {
          console.log(err.response.data.message);
          
        });
      }
      
    } catch (error) {
      console.log(error);
    }
    };

 

    //End of Testing  
    
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full justify-between bg-gradient-to-b from-orange-600 to-orange-500 rounded mb-4 px-2 py-2 text-left font-semibold text-2xl text-white ">
          <div className='flex flex-row items-center'>
            {room.attributes.name} - {room.attributes.city}, {room.attributes.area} | <Rating defaultRating={room.attributes.avg_reviews} editable={false} /> | {user && (<FaHeart size={26} color={favoriteColor} onClick={handleFavorite}/>)}
          </div>
          <div className="">
            Per Night: {room.attributes.price}
          </div>
        </div> 
        <div className="block h-5 w-full">
          <img src={`assets/images/rooms/${room.attributes.photo_url}`} alt={`${room.attributes.photo_url}`} height="auto"/>
        </div>
        <div className="">
        <Rating defaultRating={defaultRating} editable={true} /*count={3}*//>
        </div>
       
    </div>
    
    </>
  
  )
}

export default RoomDetails