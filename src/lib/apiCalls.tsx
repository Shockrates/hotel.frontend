import { useEffect, useState } from "react";
import apiClient from "./apiClient";
import { Room } from "../types";

export const useGetAllRooms = () =>{

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        await apiClient.get('/api/rooms')
        .then(response => {
            setRooms(response.data.data) ;   
        })
        .catch(error => console.error(error));
      } catch (error) {
        console.log(error);
      } 
    }
    getAllRooms();
  }, [])

  return {
    rooms
  }
  
}

// Logout the user
export const handleLogout = async () => {
  try {
    const resp = await apiClient.post('/api/logout');
    if (resp.status === 200) {
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  } catch (error) {
    console.log(error);
  }
};
