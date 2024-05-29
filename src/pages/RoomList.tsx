import {  useOutletContext, useSearchParams } from "react-router-dom";
import { searchRooms} from "../lib/apiCalls";
import { Room, FormProps } from "../types";
import { PriceSlider } from "../components/PriceSlider";
import { Form } from "../components/Form";
import RoomCard from "../components/RoomCard";
import { useEffect, useState } from "react";




const  RoomList = () => {

  const [params, setParams] = useSearchParams();
  const props:FormProps = useOutletContext();

  const queryData: Record<string, any> = {};

  const [rooms, setRooms] = useState<Room[]>()
  const [error, setError] = useState()

  params.forEach((value, key) => {
    queryData[key] = value;
  });

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
      .catch(console.error);
  }, [params])
 
  if (error) {
    console.log(error);
  }


  return (
    <>
    <div className="flex flex-col sm:flex-row w-full">
      <aside className="sm:sticky sm:top-20 w-full sm:w-1/3 md:w-1/4  bg-blue-500 h-screen md:min-w-[254px]">
        <Form 
          cities={props.cities} 
          roomTypes={props.roomTypes} 
          formStyle="flex flex-col gap-5" 
          children={<PriceSlider 
                      initialMin={props.min} 
                      initialMax={props.max}
                      min={0}
                      max={props.max}
                      step={1}
                      priceCap={0}
                  />}/>
      </aside>
      <section className="w:full sm:w-2/3 md:w-3/4  px-6 py-0 ">
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

export default RoomList