import { useEffect, useState } from "react";
import apiClient from "./apiClient";
import { Room, RoomType} from "../types";


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


export const getAllRoomTypes = async () => {

  let roomTypes:RoomType[] = []

  try {
    await apiClient.get('/api/roomtype')
    .then(response => {
        roomTypes = response.data.data ;   
    })
    .catch(error => console.error(error));
  } catch (error) {
    console.log(error);
  }  
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

export const useSearchResultRooms = (formData:Record<string, any>) =>{

  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, seterror] = useState();

  useEffect(() => {
    const getAllRooms = async (query:Record<string, any>) => {
      console.log(query);
      
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

export const searchRooms = async (formData:Record<string, any>) =>{

  // const [rooms, setRooms] = useState<Room[]>([]);
  // const [error, seterror] = useState();
  let rooms:Room[] = [];
  let error;


  try {
    await apiClient.post('/api/roomsearch', formData)
    .then(response => {
        rooms = response.data.data ;      
    })
    .catch(err => error = err.response.data.message);
  } catch (error) {
    console.log(error);
  } 
    
  return {
    rooms, error
  }
}
