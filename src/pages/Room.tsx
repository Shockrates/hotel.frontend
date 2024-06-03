import { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { getRoom } from '../lib/apiCalls';
import { Favorite, Review, Room } from '../types';
import Rating from '../components/Rating';
import { FaHeart } from "react-icons/fa6";
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../lib/apiClient';
import MapComponent from '../components/MapComponent';
import ReviewComponent from '../components/ReviewComponent';



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
    const reviews:Review[]= room.relationships.reviews
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
        <div className="block h-auto w-full mb-4">
          <img src={`/assets/images/rooms/${room.attributes.photo_url}`} alt={`${room.attributes.photo_url}`} height="auto"/>
        </div>
        <div className="grid grid-cols-5 w-full justify-between bg-gradient-to-b from-orange-600 to-orange-500 rounded mb-4 px-2 py-2 text-left font-semibold text-xl text-white divide-x-2 divide-dashed">
          <div className="flex flex-col items-center">
            {room.attributes.count_of_guests}
            <span>COUNT OF GUESTS</span>
          </div>
          <div className="flex flex-col items-center">
            {room.attributes.type}
            <span>TYPE OF ROOM</span>
          </div>
          <div className="flex flex-col items-center">
            {room.attributes.parking? "YES" : "NO"}
            <span>PARKING</span>
          </div>
          <div className="flex flex-col items-center">
            {room.attributes.wifi? "YES" : "NO"}
            <span>WIFI</span>
          </div>
          <div className="flex flex-col items-center">
            {room.attributes.pet_friendly? "YES" : "NO"}
            <span>PET FRIENDLY</span>
          </div>
        </div>
        <div className="flex fex-col text-left mb-4">
          <div className="px-4 border-l-8 border-orange-500">
            <h1 className='mb-1 text-xl font-bold'>Room Description</h1>
            <p>{room.attributes.description_long}</p>
          </div>
        </div>
        <MapComponent lat={room.attributes.location_lat} lon={room.attributes.location_long} />
         
        
        <div className="flex fex-col text-left mb-4">
          <div className="px-4 border-l-8 border-orange-500">
          <h1 className='mb-1 text-xl font-bold'>Reviews</h1>
            {
              reviews && reviews.length>0  
              ?reviews.map((review, index) =>
                <ReviewComponent key={index} review={review} index={index}/>
                
              )
              :<p>No rooms Available</p>
            }
          </div>
        </div>

        <div className="flex fex-col text-left mb-4">
          <div className="px-4 border-l-8 border-orange-500">
            <h1 className='mb-1 text-xl font-bold'>Add Review</h1>
            <div className="mb-4">
              <Rating defaultRating={defaultRating} editable={true} /*count={3}*//>
          </div>
          <form action="" method="post">
            <textarea name="review" id=""></textarea>
          </form>
          </div>
        </div>
       
    </div>
    
    </>
  
  )
}

export default RoomDetails