import { useSearchParams } from "react-router-dom";
import { useSearchResultRooms, useGetAllRooms, getAllRooms } from "../lib/apiCalls";


function Rooms() {

  const [params, setParams] = useSearchParams();

  const queryData: Record<string, any> = {};

  params.forEach((value, key) => {
    queryData[key] = value;
  });

  const { rooms, error } = useSearchResultRooms(queryData);
 
   if (error) {
    console.log(error);
    
  }

  return (
    <>
      <div className="w-1/4 bg-blue-500 h-screen">

      </div>
      <ul>
        {
          rooms && rooms.length>0  
          ?rooms.map((room) =>
            <li key={room.id}> {room.attributes.name}</li>
          )
          :<p>No rooms Available</p>
        }
        </ul>
    </>
    
  )
}

export default Rooms