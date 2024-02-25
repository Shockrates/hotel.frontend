import { useLoaderData } from "react-router-dom";
import { Form } from "../components/Form";
import { getAllRooms} from "../lib/apiCalls";
import { castToFormOptions } from "../lib/utils";
import { option } from "../types";

type formProps = {
  cities: option[]
  roomTypes: option[],
  
}

export const homeLoader = async () => {
  
  const rooms = await getAllRooms();
  const {cities, roomTypes} = castToFormOptions(rooms);

  return {cities, roomTypes};

}

function Home() {
  
  const {cities, roomTypes} = useLoaderData() as formProps;
  
  return ( 

    <div className='mx-auto transform animate-slideIn'>
      <div className="mt-10"></div>
      <Form cities={cities} roomTypes={roomTypes} formStyle="grid gap-5 md:grid-cols-2"/>
    </div>   
    
  )
}

export default Home
