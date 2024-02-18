import { useSearchParams } from "react-router-dom";
import { useSearchResultRooms } from "../lib/apiCalls";


function Rooms() {

  const [params, setParams] = useSearchParams();

  const queryData: Record<string, any> = {};

  params.forEach((value, key) => {
    queryData[key] = value;
  });

  const { rooms } = useSearchResultRooms(queryData);
  const roomList = rooms.map((room) =>
        <li key={room.id}> {room.attributes.name}</li>
    );

  return (
    <>
      <div className="w-1/4 bg-blue-500 h-screen">

      </div>
      <ul>{roomList}</ul>
    </>
    
  )
}

export default Rooms