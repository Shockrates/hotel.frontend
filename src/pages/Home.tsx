import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Form } from "../components/Form";
import { getAllRooms} from "../lib/apiCalls";
import { castToFormOptions } from "../lib/utils";
import { option } from "../types";

type formProps = {
  cities: option[]
  roomTypes: option[],
  
}

export const homeLoader = async ({ params }: LoaderFunctionArgs) => {
  
  const rooms = await getAllRooms();
  const {cities, roomTypes} = castToFormOptions(rooms);
  
  return {cities, roomTypes};

}

export type HomeLoaderResponse = Awaited<ReturnType<typeof homeLoader>>;


function Home() {
  
  const {cities, roomTypes} = useLoaderData() as HomeLoaderResponse;
  
  return ( 

    <div className='mx-auto transform animate-slideIn'>
      <div className="mt-10"></div>
      <Form cities={cities} roomTypes={roomTypes} formStyle="grid gap-5 md:grid-cols-2" action="/" />
    </div>   
    
  )
}

export default Home
