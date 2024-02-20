import { useEffect, useState } from "react";
import apiClient from "./apiClient";
import { Room, option } from "../types";


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


//TO DO
export const getAllRoomTypes = async () => {

  //let cities:object[] = []
  let roomTypes:option[] = []
  let rooms = await getAllRooms();

  try {
    await apiClient.get('/api/roomtype')
    .then(response => {
        roomTypes = response.data.data ;   
    })
    .catch(error => console.error(error));
  } catch (error) {
    console.log(error);
  } 

  //const cities = [...new Set(rooms.map(room => room.attributes.city))];
 
  return roomTypes
}

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

export const useSearchResultRooms = (formData:object) =>{

  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, seterror] = useState();

  useEffect(() => {
    const getAllRooms = async (query:object) => {
      try {
        await apiClient.post('/api/roomsearch', query)
        .then(response => {
            setRooms(response.data.data) ;   
        })
        .catch(error => seterror(error.response.data.message));
      } catch (error) {
        console.log(error);
      } 
    }
    getAllRooms(formData);
  }, [])

  return {
    rooms, error
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
