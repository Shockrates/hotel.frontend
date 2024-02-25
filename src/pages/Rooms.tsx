import { useLoaderData, useSearchParams } from "react-router-dom";
import { useSearchResultRooms} from "../lib/apiCalls";
import { option } from "../types";
import { DetailedForm } from "../components/DetailedForm";
import { PriceSlider } from "../components/PriceSlider";
import { Form } from "../components/Form";

type formProps = {
  cities: option[]
  roomTypes: option[],
  
}



function Rooms() {

  const [params, setParams] = useSearchParams();
  const {cities, roomTypes} = useLoaderData() as formProps;

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
      <Form 
        cities={cities} 
        roomTypes={roomTypes} 
        formStyle="flex flex-col gap-5" 
        children={<PriceSlider 
                    initialMin={10} 
                    initialMax={400}
                    min={0}
                    max={500}
                    step={1}
                    priceCap={0}
                />}/>
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