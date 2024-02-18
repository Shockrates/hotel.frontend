import { useLoaderData } from "react-router-dom";
import { Form } from "../components/Form";
import { getAllRooms} from "../lib/apiCalls";
import { getTypesAndCities } from "../lib/utils";

export const homeLoader = async () => {
 
  const rooms  = await getAllRooms();
  const {roomTypes, cities} = getTypesAndCities(rooms);
  return {cities, roomTypes};

}

function Home() {
  
  const {roomTypes, cities} = useLoaderData() as any;
  
  return ( 

    <div className='mx-auto transform animate-slideIn'>
      <div className="mt-10"></div>
      <Form cities={cities} roomTypes={roomTypes} />
    </div>   
    
  )
}

export default Home
