import { useLoaderData, useSearchParams } from "react-router-dom";
import { searchRooms, useSearchResultRooms} from "../lib/apiCalls";
import { Room, option } from "../types";
import { DetailedForm } from "../components/DetailedForm";
import { PriceSlider } from "../components/PriceSlider";
import { Form } from "../components/Form";
import RoomCard from "../components/RoomCard";
import { useEffect, useState } from "react";

type formProps = {
  cities: option[]
  roomTypes: option[],
  
}



const  Rooms = () => {

  const [params, setParams] = useSearchParams();
  const {cities, roomTypes} = useLoaderData() as formProps;

  const queryData: Record<string, any> = {};

  const [rooms, setRooms] = useState<Room[]>()
  const [error, setError] = useState()

  params.forEach((value, key) => {
    queryData[key] = value;
  });


//TO DO -> THIS CAUSES ERRORS
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const { rooms, error } = await searchRooms(queryData);
      setRooms(rooms);
      setError(error);
    }
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [queryData])
 
  if (error) {
    console.log(error);
  }


  return (
    <>
    <div className="flex flex-col sm:flex-row w-full">
      <aside className="w-full sm:w-1/4 bg-blue-500 h-screen">
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
      </aside>
      <section className="w:full sm:w-3/4 px-6 py-0 ">
            <header className="bg-orange-500 rounded mb-4 px-2 py-1">
              <h2 className="font-body font-medium text-lg text-left text-white m-1">Search Results</h2>
            </header>
            
              {
                rooms && rooms.length>0  
                ?rooms.map((room) =>
                  // <li key={room.id}> {room.attributes.name}</li>
                  <RoomCard key={room.id} room={room} />
                )
                :<p>No rooms Available</p>
              }
             
      </section>
    </div>
      
     
    </>
    
  )
}

export default Rooms