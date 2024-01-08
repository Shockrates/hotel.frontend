import { useGetAllRooms } from "../lib/apiCalls";

function Rooms() {

  const { rooms } = useGetAllRooms();
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