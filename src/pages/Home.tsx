import { useLoaderData } from "react-router-dom";
import { Form } from "../components/Form";
import { getAllRoomTypes, getAllRooms} from "../lib/apiCalls";
import { getTypesAndCities } from "../lib/utils";

export const homeLoader = async () => {
 
  const rooms  = await getAllRooms();
  const types = await getAllRoomTypes();
  const {roomTypes, cities} = getTypesAndCities(rooms);
  return {cities, roomTypes, types};

}

function Home() {
  
  const {roomTypes, cities, types} = useLoaderData() as any;
  console.log(types);
  
  return ( 

    <div className='mx-auto transform animate-slideIn'>
      <div className="mt-10"></div>
      <Form cities={cities} roomTypes={roomTypes} />
    </div>   
    
  )
}

export default Home
