import { useEffect, useState } from "react";
import apiClient from "./apiClient";
import { Room } from "../types";
import { getTypesAndCities } from "./utils";

export const getAllRooms = async () => {

  let rooms:Room[] = []

  try {
    await apiClient.get('/api/rooms')
    .then(response => {
        rooms = response.data.data ;   
    })
    .catch(error => console.error(error));
  } catch (error) {
    console.log(error);
  } 

  return rooms
}


export const useSearchResultRooms = (formData:object) =>{

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const getAllRooms = async (query:object) => {
      try {
        await apiClient.post('/api/roomsearch', query)
        .then(response => {
            setRooms(response.data.data) ;   
        })
        .catch(error => console.error(error));
      } catch (error) {
        console.log(error);
      } 
    }
    getAllRooms(formData);
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
